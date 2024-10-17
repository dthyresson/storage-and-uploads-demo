import { Router, Route, Set } from '@redwoodjs/router'

import DemoLayout from './layouts/DemoLayout/DemoLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={DemoLayout}>
        <Route path="/demo15" page={Demo15Page} name="demo15" />
        <Route path="/demo14" page={Demo14Page} name="demo14" />
        <Route path="/demo13/post/{id}" page={Demo13PostPage} name="demo13Post" />
        <Route path="/demo13" page={Demo13Page} name="demo13" />
        <Route path="/demo12" page={Demo12Page} name="demo12" />
        <Route path="/demo11" page={Demo11Page} name="demo11" />
        <Route path="/demo10" page={Demo10Page} name="demo10" />
        <Route path="/demo9" page={Demo9Page} name="demo9" />
        <Route path="/demo8/attachments" page={Demo8AttachmentsPage} name="demo8Attachments" />
        <Route path="/demo8" page={Demo8Page} name="demo8" />
        <Route path="/demo7/attachments" page={Demo7AttachmentsPage} name="demo7Attachments" />
        <Route path="/demo7" page={Demo7Page} name="demo7" />
        <Route path="/demo6/attachments" page={Demo6AttachmentsPage} name="demo6Attachments" />
        <Route path="/demo6" page={Demo6Page} name="demo6" />
        <Route path="/demo5/attachments" page={Demo5AttachmentsPage} name="demo5Attachments" />
        <Route path="/demo5" page={Demo5Page} name="demo5" />
        <Route path="/demo4" page={Demo4Page} name="demo4" />
        <Route path="/demo3" page={Demo3Page} name="demo3" />
        <Route path="/demo2" page={Demo2Page} name="demo2" />
        <Route path="/demo1" page={Demo1Page} name="demo1" />
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
