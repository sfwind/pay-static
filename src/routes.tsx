import * as React from 'react'
import { config } from 'modules/helpers/JsConfig'
import { Route } from 'react-router'
import Base from 'modules/base/Base'
import RisePay from 'modules/pay/risepay/RisePay'
import CampPay from 'modules/pay/CampPay'
import RiseApply from 'modules/pay/risepay/RiseApply'
import RiseShare from 'modules/pay/risepay/RiseShare'

// import NormalQuestion from 'modules/pay/NormalQuestion'
import CampPaySuccess from 'modules/pay/CampPaySuccess'
import AuditionSuccess from 'modules/pay/AuditionSuccess'
import ApplySuccess from 'modules/pay/risepay/ApplySuccess';

import MemberPaySuccess from 'modules/pay/MemberPaySuccess'
const routes = (
  <Route path="/">
    <Route component={Base} onChange={() => {
      config(['chooseWXPay'])
    }}>
      <Route path="/pay/camp/success" component={CampPaySuccess}/>
      <Route path="/pay/member/success" component={MemberPaySuccess}/>
      <Route path="/pay/audition/success" component={AuditionSuccess}/>
      {/*<Route path="/pay/risemember/normalquestion" component={NormalQuestion}/>*/}

      <Route path="pay/rise" component={RisePay}/>
      <Route path="pay/camp" component={CampPay}/>
      <Route path="pay/static/rise" component={RiseApply}/>
      <Route path="pay/static/share" component={RiseShare}/>
      <Route path="pay/apply" component={ApplySuccess}/>
      <Route path="pay/pay" component={RisePay}/>
    </Route>
  </Route>
)

export default routes
