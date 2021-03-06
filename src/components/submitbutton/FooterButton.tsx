import * as React from 'react'
import './FooterButton.less'
import classnames from 'classnames';
import { mark } from 'utils/request'

interface SubmitButtonProps {
  btnArray: any,
}

interface SubmitButtonState {

}

export class FooterButton extends React.Component<SubmitButtonProps, SubmitButtonState> {

  constructor() {
    super()
  }

  buttonClick(button = {}) {
    const {
      click, module, func, action, memo
    } = button;
    if(!!module && !!action) {
      let param = {
        module: module,
        function: func,
        action: action,
        memo: memo
      }
      mark(param);
    }
    click()
  }

  render() {
    const { btnArray = [], primary = false, second = false } = this.props
    if(btnArray.length === 1) {

      const { text } = btnArray[ 0 ];
      return (
        <div className={classnames('ft-button-wrapper', 'button-footer-component', {
          'primary': primary,
          'second': second
        })}>
          <div className="submit-btn" onClick={() => this.buttonClick(btnArray[ 0 ])}>{text}</div>
        </div>
      )
    } else {
      //if(btnArray.length === 2)
      return (
        <div className={classnames('ft-button-wrapper', 'button-footer-component', 'two-buttons', {
          'primary': primary,
          'second': second
        })}>
          {btnArray.map((btn, idx) => {
            const { text } = btn;
            return (
              <div className="button" key={idx} onClick={() => this.buttonClick(btn)}>
                {text}
              </div>
            )
          })}
        </div>
      )
    }
  }

}
