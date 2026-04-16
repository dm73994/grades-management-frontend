import { Navigate, Route, Routes } from 'react-router'
import SubjectsPage from '../pages/subjects/SubjectsPage'
import StudentsPage from '../pages/students/StudentsPage'
import MainLayout from '../components/layouts/MainLayout'

const Router = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/Subjects' element={<SubjectsPage />} />
        <Route path='/students' element={<StudentsPage />} />
      </Route>

        <Route path='/' element={<Navigate replace to="/Students" />} />
        <Route path='*' element={<Navigate replace to="/" />} />
    </Routes>
  )
}

export default Router