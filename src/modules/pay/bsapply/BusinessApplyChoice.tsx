import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BusinessApplyChoice.less';
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import * as _ from 'lodash';
import { pget, ppost, mark } from "utils/request"
import { loadBusinessApplyQuestion, submitApply, sendValidCode, validSMSCode } from './async';
import DropDownList from "../../../components/form/DropDownList";
import { SubmitButton } from '../../../components/submitbutton/SubmitButton'
import $ from 'jquery';
import { FooterButton } from '../../../components/submitbutton/FooterButton'

@connect(state => state)
export default class BusinessApplyChoice extends Component<any, any> {
  constructor() {
    super();
    this.state = {
      questionGroup: [],
      seriesCount: 0,
      currentIndex: 0,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, region, location } = this.props;

    mark({ module: "打点", function: "商学院审核", action: "进入填写报名信息页面" });

    dispatch(startLoad());
    loadBusinessApplyQuestion().then(res => {
      dispatch(endLoad());
      if(res.code === 200) {
        this.setState({ questionGroup: res.msg, seriesCount: res.msg.length });
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    });

    if(!region) {
      pget('/rise/customer/region').then(res => {
        if(res.code === 200) {
          dispatch(set("region", res.msg));
        } else {
          dispatch(alertMsg(res.msg));
        }
      }).catch(err => dispatch(alertMsg(err.msg)));
    }
  }

  /**
   * 处理当前题目group的变动
   * @param group 新的group对象
   * @param index 当前index
   */
  handleGroupChanged(group, index) {
    const { questionGroup, currentIndex, seriesCount, } = this.state
    let newGroups = _.cloneDeep(questionGroup);
    newGroups[ index ] = group;
    this.setState({ questionGroup: newGroups });
  }

  /**
   * 检查题目是否完成
   * @param question 题目
   * @param userChoices 用户选项
   */
  checkQuestionComplete(question, userChoices) {
    const { type, chosenId, preChoiceId, userValue, oneId, twoId, request, phoneCheckCode } = question;
    if(!!preChoiceId) {
      if(_.indexOf(userChoices, preChoiceId) === -1) {
        // 不满足前置条件，则不检查
        return true;
      }
    }
    if(!request) {
      // 不是必填
      return true;
    }

    switch(type) {
      case QuestionType.PICKER:
      case QuestionType.RADIO:
        return !!chosenId;
      case QuestionType.BLANK:
      case QuestionType.MULTI_BLANK:
      case QuestionType.PHONE:
        return !!userValue;
      case QuestionType.AREA:
        return !!oneId && !!twoId;
      default:
        return false;
    }
  }

  /**
   * 点击提交按钮
   */
  handleClickSubmit() {
    const { dispatch, region } = this.props;
    const { questionGroup, currentIndex, seriesCount, } = this.state
    const userChoices = this.calculateUserChoices(questionGroup);

    for(let i = 0; i < questionGroup.length; i++) {
      let group = questionGroup[ i ];
      let questions = group.questions;
      for(let y = 0; y < questions.length; y++) {
        let checkResult = this.checkQuestionComplete(questions[ y ], userChoices);
        if(!checkResult) {
          console.log(questions[ y ]);
          dispatch(alertMsg("完成所有必填项后才能提交哦"));
          return;
        }
      }
    }
    // 检测通过，开始提交
    // 先拼装用户的提交记录

    let result = _.reduce(questionGroup, (submitList, nextGroup) => {
      let subParam = _.reduce(nextGroup.questions, (tempList, question) => {
        let subTempParam = {};
        switch(question.type) {
          case QuestionType.PICKER:
          case QuestionType.RADIO:
            _.merge(subTempParam, { questionId: question.id, choiceId: question.chosenId });
            break;
          case QuestionType.BLANK:
          case QuestionType.MULTI_BLANK:
          case QuestionType.PHONE:
            _.merge(subTempParam, { questionId: question.id, userValue: question.userValue });
            break;
          case QuestionType.AREA:
            const provinceName = _.find(_.get(region, "provinceList"), { id: question.oneId }).value;
            const cityName = _.find(_.get(region, "cityList"), { id: question.twoId }).value;
            _.merge(subTempParam, { questionId: question.id, userValue: provinceName + '-' + cityName });
            break;
          default:
          // ignore
        }
        tempList.push(subTempParam);
        return tempList;
      }, []);
      submitList = submitList.concat(subParam);
      return submitList;
    }, []);

    // 特殊检查电话
    let phoneQuestions = _.reduce(questionGroup, (questionList, nextGroup) => {
      let subQuestion = _.find(nextGroup.questions, { type: QuestionType.PHONE });
      if(!!subQuestion) {
        questionList.push(subQuestion);
      }
      return questionList;
    }, []);
    console.log('phones', phoneQuestions);
    let phoneInfo = _.get(phoneQuestions, '[0]');
    const { preChoiceId, userValue, phoneCheckCode } = phoneInfo;
    let hasPhone = true;
    if(!!phoneInfo) {
      // 有电话题目
      if(!!preChoiceId) {
        // 如果有前置选项，并且前置选项没有选，则不渲染这个
        if(_.indexOf(userChoices, preChoiceId) === -1) {
          hasPhone = false;
        }
      }
    }
    if(hasPhone) {
      if(!phoneCheckCode) {
        dispatch(alertMsg('请输入验证码'));
        return;
      }

      dispatch(startLoad());
      validSMSCode({ phone: userValue, code: phoneCheckCode }).then(res => {
        if(res.code === 200) {
          this.submitApplyAPI({ userSubmits: result });
        } else {
          dispatch(endLoad());
          dispatch(alertMsg(res.msg));
        }
      }).catch(ex => {
        dispatch(alertMsg(ex));
      })
    } else {
      dispatch(startLoad());
      this.submitApplyAPI({ userSubmits: result });
    }
  }

  submitApplyAPI(param) {
    const { dispatch } = this.props;
    // 开始提交
    submitApply(param).then(res => {
      dispatch(endLoad());
      if(res.code === 200) {
        this.context.router.push('/rise/static/business/apply/submit/success');
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
  }

  /**
   * 计算用户的选项
   * @param questionGroup 题目组
   * @returns 用户选项id的数组
   */
  calculateUserChoices(questionGroup) {
    return _.reduce(questionGroup, (resultArray, tempGroup) => {
      let tempArray = _.reduce(tempGroup.questions, (subArray, tempQuestion) => {
        if(tempQuestion.type === QuestionType.PICKER || tempQuestion.type === QuestionType.RADIO) {
          if(!!tempQuestion.chosenId) {
            subArray.push(tempQuestion.chosenId);
          }
        }
        return subArray;
      }, []);
      resultArray = resultArray.concat(tempArray);
      return resultArray;
    }, []);
  }

  /**
   * 点击下一步
   */
  handleClickNextStep() {
    const { dispatch } = this.props;
    const { questionGroup, currentIndex, seriesCount, } = this.state
    let group = questionGroup[ currentIndex ];
    let questions = group.questions;
    const userChoices = this.calculateUserChoices(questionGroup);
    for(let i = 0; i < questions.length; i++) {
      let checkResult = this.checkQuestionComplete(questions[ i ], userChoices);
      if(!checkResult) {
        dispatch(alertMsg("完成必填项后再点下一步哦"));
        return;
      }
    }
    this.setState({ group: group }, () => {
      $('.question-group').animateCss('fadeOutLeft', () => {
        this.setState({ currentIndex: currentIndex + 1 }, () => {
          $('.question-group').animateCss('fadeInRight')
        })
      })
    })
  }

  /**
   * 点击上一步
   */
  prevStep() {
    const { questionGroup, currentIndex, seriesCount, } = this.state

    $('.question-group').animateCss('fadeOutRight', () => {
      this.setState({ currentIndex: currentIndex - 1 },
        () => {
          $('.question-group').animateCss('fadeInLeft');
        }
      )
    })
  }

  render() {
    const { questionGroup, currentIndex, seriesCount, } = this.state
    const isSelected = (choices, choice) => {
      return !_.isEmpty(_.find(choices, {
        id: choice.id, choice: true
      }));
    }

    const renderButtons = () => {
      if(currentIndex === 0) {
        return (
          <FooterButton btnArray={[ {
            click: () => this.handleClickNextStep(),
            text: '下一步'
          } ]}/>
        )
      } else if(currentIndex === seriesCount - 1) {
        return (
          <FooterButton btnArray={[ {
            click: () => this.handleClickSubmit(),
            text: '提交'
          } ]}/>
        )
      } else {
        return (
          <FooterButton btnArray={[ {
            click: () => this.prevStep(),
            text: '上一步'
          }, {
            click: () => this.handleClickNextStep(),
            text: '下一步'
          } ]}/>
        )
      }
    }

    return (
      <div className="apply-choice" style={{ minHeight: window.innerHeight }}>
        <div className="apply-container">
          <div className="apply-page-header">圈外商学院入学申请</div>
          <div className="apply_rate">{(currentIndex / (seriesCount - 1)).toFixed(2) * 100}%</div>
          <div className="apply-progress">
            <div className="apply-progress-bar"
                 style={{ width: (window.innerWidth - 90) * (currentIndex / (seriesCount - 1)) }}/>
          </div>
          <QuestionGroup group={questionGroup[ currentIndex ]} allGroup={questionGroup} region={this.props.region}
                         onGroupChanged={(group) => this.handleGroupChanged(group, currentIndex)}/>
        </div>
        <div style={{ height: '65px', width: '100%' }}/>
        {renderButtons()}
      </div>
    )
  }
}

interface QuestionGroupProps {
  group: any,
  onGroupChanged?: any,
  allGroup: any,
  region?: any,
}

enum QuestionType {
  PICKER = 1,
  RADIO,
  BLANK,
  MULTI_BLANK,
  AREA,
  PHONE,
}

@connect(state => state)
class QuestionGroup extends Component<QuestionGroupProps, any> {
  constructor() {
    super();
    this.state = { codeTimeRemain: 0 }
    this.intervalTrigger = null;
  }

  componentWillMount() {
  }

  /**
   * 通用的onChange处理方法
   * @param question 问题信息
   * @param value 值
   * @param keyName 键名
   */
  commonHandleValueChange(question, value, keyName) {
    const { group = {} } = this.props;
    const { questions = [] } = group;
    let key = _.findIndex(questions, { id: question.id });
    let result = _.set(_.cloneDeep(group), `questions[${key}]`, _.set(_.cloneDeep(question), keyName, value));
    this.props.onGroupChanged(result);
  }

  /**
   * 点击选择区域
   * @param question 问题信息
   * @param one 省
   * @param two 市
   */
  handleChoiceRegion(question, one, two) {
    const { group = {} } = this.props;
    const { questions = [] } = group;
    let key = _.findIndex(questions, { id: question.id });
    let result = _.set(_.cloneDeep(group), `questions[${key}]`, _.set(_.cloneDeep(question), 'oneId', one.id));
    _.set(result, `questions[${key}].twoId`, two.id);
    this.props.onGroupChanged(result);
  }

  /**
   * 点击发送验证码
   */
  handleClickSendPhoneCode(questionInfo) {
    const { phoneCheckCode, userValue } = questionInfo;
    const { codeTimeRemain = 0 } = this.state;
    const { dispatch } = this.props;
    console.log('phone', questionInfo);
    if(codeTimeRemain !== 0) {
      dispatch(alertMsg(`请${codeTimeRemain}秒稍后再试`));
      return;
    } else {
      // 可以发送，检查phone
      let NUMBER_REG = /^[0-9]+$/;
      if(!userValue) {
        dispatch(alertMsg('请输入手机号码'));
        return;
      }

      if(!NUMBER_REG.test(userValue)) {
        dispatch(alertMsg('请输入格式正确的手机'));
        return;
      }

      if(!!this.intervalTrigger) {
        clearInterval(this.intervalTrigger);
      }
      this.setState({ codeTimeRemain: 60 }, () => {
        this.intervalTrigger = setInterval(() => {
          this.setState({ codeTimeRemain: this.state.codeTimeRemain - 1 });
          if(this.state.codeTimeRemain <= 0) {
            clearInterval(this.intervalTrigger);
          }
        }, 1000);
      })

      // 发送验证码
      sendValidCode(userValue).then(res => {
        if(res.code !== 200) {
          dispatch(alertMsg(res.msg));
        }
      });
    }

  }

  render() {
    const { group = {}, allGroup = [], region, location } = this.props;
    const { questions = [] } = group;

    const provinceList = _.get(region, "provinceList");
    const cityList = _.get(region, "cityList");

    const userChoices = _.reduce(allGroup, (resultArray, tempGroup) => {
      let tempArray = _.reduce(tempGroup.questions, (subArray, tempQuestion) => {
        if(tempQuestion.type === QuestionType.PICKER || tempQuestion.type === QuestionType.RADIO) {
          if(!!tempQuestion.chosenId) {
            subArray.push(tempQuestion.chosenId);
          }
        }
        return subArray;
      }, []);
      resultArray = resultArray.concat(tempArray);
      return resultArray;
    }, []);

    const renderPickerQuestion = (questionInfo) => {
      const { question, type, sequence, request, preChoiceId, id, series, tips, choices, chosenId } = questionInfo;
      let userData = {
        id: chosenId,
      }
      _.forEach(choices, (item, key) => {
        item.value = item.subject;
        if(item.id === chosenId) {
          userData.value = item.value;
        }
      });
      //
      let defaultValue = _.find(choices, { defaultSelected: true });
      return mixQuestionDom(questionInfo,
        <div className="picker-box">
          <DropDownList rootClassName="apply-picker"
                        level={1} data={[ choices ]} userData={chosenId ? [ userData ] : null}
                        defaultData={defaultValue ? [ {
                          id: defaultValue.id, value: defaultValue.subject
                        } ] : undefined}
                        onChoice={(one) => this.commonHandleValueChange(questionInfo, Number.parseInt(one.id), 'chosenId')}/>
        </div>
      )
    }

    const mixQuestionDom = (questionInfo, QuestionDom) => {
      const { question, type, sequence, request, preChoiceId, id, series, tips, choices, chosenId } = questionInfo;

      return (
        <div className="question" key={questionInfo.id}>
          <div className="question-label">
            <span dangerouslySetInnerHTML={{ __html: question }}/>
            {request ? <span style={{ color: 'red' }}>*</span> : null}
          </div>
          {QuestionDom}
          {tips ? <div className="question-tips">
            {tips}
          </div> : null}
        </div>
      )
    }

    const renderRadioQuestion = (questionInfo) => {
      const { question, type, sequence, request, preChoiceId, id, series, tips, choices, chosenId } = questionInfo;
      return mixQuestionDom(questionInfo,
        <div className="question-radio">
          <ul className="radio-wrapper">
            {choices.map((choice) => {
              return (
                <li className="radio-choice" key={choice.id}
                    onClick={() => this.commonHandleValueChange(questionInfo, Number.parseInt(choice.id), 'chosenId')}>
                  <span className={`list-style ${chosenId === choice.id ? 'selected' : ''}`}/>
                  <span className="list-text">{choice.subject}</span>
                </li>
              )
            })}
          </ul>
        </div>
      )
    }

    const renderPhoneQuestion = (questionInfo) => {
      const { question, type, sequence, request, preChoiceId, id, series, tips, choices, chosenId, placeholder, userValue, phoneCheckCode } = questionInfo;
      const { codeTimeRemain = 0 } = this.state;
      return mixQuestionDom(questionInfo,
        <div>
          <div className="question-blank">
            <input type="text" placeholder={placeholder ? placeholder : '请填写'} value={userValue}
                   onChange={(e) => this.commonHandleValueChange(questionInfo, e.target.value, 'userValue')}/>
          </div>
          <div className="check-code-wrapper">
            <span className="code-send-label">验证码：</span>
            <div className={`send-phone-code ${codeTimeRemain === 0 ? 'free' : 'sending'}`}
                 onClick={() => this.handleClickSendPhoneCode(questionInfo)}>
              {codeTimeRemain === 0 ? '发送验证码' : `${codeTimeRemain}秒后重新发送`}
            </div>
            <input type="text" placeholder='请填写验证码' value={phoneCheckCode}
                   onChange={(e) => this.commonHandleValueChange(questionInfo, e.target.value, 'phoneCheckCode')}/>
          </div>
        </div>
      )
    }

    const renderBlankQuestion = (questionInfo) => {
      const { question, type, sequence, request, preChoiceId, id, series, tips, choices, chosenId, placeholder, userValue } = questionInfo;
      return mixQuestionDom(questionInfo,
        <div className="question-blank">
          <input type="text" placeholder={placeholder ? placeholder : '请填写'} value={userValue}
                 onChange={(e) => this.commonHandleValueChange(questionInfo, e.target.value, 'userValue')}/>
        </div>
      )
    }

    const renderMultiBlankQuestion = (questionInfo) => {
      const { question, type, sequence, request, preChoiceId, id, series, tips, choices, chosenId, placeholder, userValue } = questionInfo;
      return mixQuestionDom(questionInfo,
        <div className="question-multi-blank">
          <textarea type="text" placeholder={placeholder ? placeholder : '请填写'} value={userValue}
                    onChange={(e) => this.commonHandleValueChange(questionInfo, e.target.value, 'userValue')}
                    rows={5}
          />
        </div>
      )
    }

    const renderAreaQuestion = (questionInfo) => {
      const { question, type, sequence, request, preChoiceId, id, series, tips, choices, chosenId, oneId, twoId } = questionInfo;
      let userData = [
        { id: oneId }, { id: twoId }
      ];
      if(!!oneId && !!twoId) {
        _.set(userData, '[0].value', _.get(_.find(provinceList, { id: oneId }), 'value'));
        _.set(userData, '[1].value', _.get(_.find(cityList, { id: twoId }), 'value'));
      }

      return mixQuestionDom(questionInfo,
        <div className="picker-box">
          <DropDownList rootClassName="apply-picker"
                        level={2} data={[ provinceList, cityList ]} userData={userData[ 1 ].id ? userData : null}
                        onChoice={(one, two) => this.handleChoiceRegion(questionInfo, one, two)}/>
        </div>
      )
    }

    return (
      <div className='question-group'>
        {questions ? questions.map((item, key) => {
          const { type, request, preChoiceId } = item;
          if(!!preChoiceId) {
            // 如果有前置选项，并且前置选项没有选，则不渲染这个
            if(_.indexOf(userChoices, preChoiceId) === -1) {
              return null;
            }
          }
          switch(type) {
            case QuestionType.PICKER:
              return renderPickerQuestion(item);
            case QuestionType.RADIO:
              return renderRadioQuestion(item);
            case QuestionType.BLANK:
              return renderBlankQuestion(item);
            case QuestionType.AREA:
              return renderAreaQuestion(item);
            case QuestionType.MULTI_BLANK:
              return renderMultiBlankQuestion(item);
            case QuestionType.PHONE:
              return renderPhoneQuestion(item);
            default:
              return null;
          }
        }) : null}
      </div>
    )
  }
}