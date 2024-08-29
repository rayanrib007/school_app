import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MyRoute from './MyRoute';

import Login from '../pages/Login';
import Aluno from '../pages/Aluno';
import Alunos from '../pages/Alunos';
import Register from '../pages/Register';
import Fotos from '../pages/Fotos';
import Page404 from '../pages/Page404';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        axact
        path="/"
        element={<MyRoute element={<Alunos />} isClosed={false} />}
      />
      <Route
        exact
        path="/aluno/:id/edit"
        element={<MyRoute element={<Aluno />} isClosed />}
      />
      <Route
        exact
        path="/aluno/"
        element={<MyRoute element={<Aluno />} isClosed />}
      />
      <Route
        exact
        path="/fotos/:id"
        element={<MyRoute element={<Fotos />} isClosed />}
      />
      <Route
        path="/login/"
        element={<MyRoute element={<Login />} isClosed={false} />}
      />
      <Route
        path="/register/"
        element={<MyRoute element={<Register />} isClosed={false} />}
      />
      <Route path="*" element={<MyRoute element={<Page404 />} />} />
    </Routes>
  );
}
