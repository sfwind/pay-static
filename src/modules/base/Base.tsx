import * as React from 'react'
import { connect } from 'react-redux'
import { isPending } from 'utils/helpers'
import { Toast, Dialog } from 'react-weui'
import { set } from 'redux/actions'
import { config } from '../helpers/JsConfig'

const P = 'base'
const LOAD_KEY = `${P}.loading`
const SHOW_MODAL_KEY = `${P}.showModal`
import UA from 'ua-device'
import { toLower, get } from 'lodash'
import $ from 'jquery'
import { pget } from '../../utils/request'

$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName)
      if(callback) callback()
    })
    return this
  }
})

let notLoadInfoUrls = [ "pay/alipay/rise", "pay/alipay/return" ];

@connect(state => state)
export default class Main extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {
      alert: {
        buttons: [
          {
            label: '关闭',
            onClick: this.closeAnswer.bind(this)
          }
        ]
      },
      showPage: false
    }
    window.ENV.Detected = new UA(window.navigator.userAgent)
    window.ENV.osName = toLower(get(window, 'ENV.Detected.os.name'))
    window.ENV.osVersion = toLower(get(window, 'ENV.Detected.os.version.original'))
    window.ENV.systemInfo = window.ENV.osName + ':' + window.ENV.osVersion
  }

  componentWillMount() {
    let loadInfo = true;
    for(let i = 0; i < notLoadInfoUrls.length; i++) {
      let url = notLoadInfoUrls[ i ];
      if(url.indexOf(window.location.pathname) !== -1) {
        loadInfo = false;
        break;
      }
    }
    if(loadInfo) {
      pget('/rise/customer/info').then(res => {
        if(res.code === 200) {
          window.ENV.userName = res.msg.nickname
          window.ENV.headImgUrl = res.msg.headimgurl
        }
        this.setState({ showPage: true })
      })
    }
  }

  componentDidMount() {
    config([ 'chooseWXPay' ])
  }

  closeAnswer() {
    const { dispatch } = this.props
    dispatch(set(SHOW_MODAL_KEY, false))
  }

  render() {
    if(!this.state.showPage) {
      return <div></div>
    }

    return (
      <div>
        {this.props.children}
        <Toast show={isPending(this.props, LOAD_KEY)} icon="loading">
          <div style={{ fontSize: 12, marginTop: -4 }}>加载中...</div>
        </Toast>
        <Dialog {...this.state.alert}
                show={this.props.base.showModal}>
          <pre className="global-pre">{this.props.base.alertMsg}</pre>
        </Dialog>
      </div>
    )
  }
}
