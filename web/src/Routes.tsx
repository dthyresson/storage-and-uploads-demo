// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'

import DemoLayout from './layouts/DemoLayout/DemoLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={DemoLayout}>
        <Route path="/demo6/images" page={Demo6ImagesPage} name="demo6Images" />
        <Route path="/demo6" page={Demo6Page} name="demo6" />
        <Route path="/demo5/images" page={Demo5ImagesPage} name="demo5Images" />
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
