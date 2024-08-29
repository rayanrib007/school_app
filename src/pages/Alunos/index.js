import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';

import Loading from '../../components/Loading/Index';
import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';

import { AlunosContainer } from './styled';
import { ProfilePicture } from './styled';
import { NovoAluno } from './styled';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoanding] = useState(false);
  const [alunoId, setAlunoId] = useState('');
  const [errorConection, setErrorConection] = useState(false);

  useEffect(() => {
    async function getdata() {
      try {
        setIsLoanding(true);
        const response = await axios.get('/alunos/');
        setAlunos(response.data);
        setIsLoanding(false);
      } catch (error) {
        toast.error('Não foi possível estabelecer conexão com o servidor');
        setErrorConection(true);
        setIsLoanding(false);
      }
    }
    getdata();
  }, []);

  async function handleDelete(index) {
    try {
      setIsLoanding(true);
      await axios.delete(`/alunos/${alunoId}`);
      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);
      setIsLoanding(false);
      toast.success('Aluno excluído com sucesso');
    } catch (err) {
      setIsLoanding(false);
      const errors = get(err, 'response.data.errors', []);
      errors.map((error) => toast.error(error));
    }
  }
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>
      <NovoAluno to={'/aluno/'}>Novo Aluno</NovoAluno>
      <AlunosContainer>
        {!errorConection &&
          alunos.map((aluno, index) => (
            <div key={String(aluno.id)}>
              <ProfilePicture>
                {get(aluno, 'Fotos[0].url', false) ? (
                  <img
                    crossOrigin="anonymous"
                    src={aluno.Fotos[0].url}
                    alt={aluno.nome}
                  />
                ) : (
                  <FaUserCircle size={36} />
                )}
              </ProfilePicture>
              <span>{aluno.nome}</span>
              <span>{aluno.email}</span>
              <Link to={`/aluno/${aluno.id}/edit`}>
                <FaEdit size={16} />
              </Link>
              {alunoId === aluno.id ? (
                <Link>
                  <FaExclamation
                    onClick={() => handleDelete(index)}
                    size={16}
                  />
                </Link>
              ) : (
                <Link onClick={() => setAlunoId(aluno.id)}>
                  <FaWindowClose size={16} />
                </Link>
              )}
            </div>
          ))}
      </AlunosContainer>
    </Container>
  );
}
