import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture, Title } from './styled';

import axios from '../../services/axios';
import { toast } from 'react-toastify';
import { isEmail, isFloat, isInt } from 'validator';
import Loading from '../../components/Loading/Index';
import { FaEdit, FaUserCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';
import { Link } from 'react-router-dom';

export default function FormAluno() {
  const params = useParams();
  const id = get(params, 'id', '');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [isLoading, setIsLoanding] = useState(false);
  const [foto, setFoto] = useState('');
  const aluno = { nome, sobrenome, email, idade, peso, altura };

  useEffect(() => {
    async function getAluno() {
      if (!id) return;
      try {
        setIsLoanding(true);
        const response = await axios.get(`/alunos/${id}`);
        const aluno = response.data;
        const foto = get(aluno, 'Fotos[0].url', '');
        setFoto(foto);
        setNome(aluno.nome);
        setSobrenome(aluno.sobrenome);
        setEmail(aluno.email);
        setIdade(aluno.idade);
        setPeso(aluno.peso);
        setAltura(aluno.altura);
        setIsLoanding(false);
      } catch (e) {
        const errors = get(e.response.data, 'errors', []);
        errors.forEach((error) => toast.error(error));
        setIsLoanding(false);
        navigate('/');
      }
    }
    getAluno();
  }, [id, navigate]);

  function validade() {
    let isValid = true;

    if (nome.length < 3 || nome.length > 255) {
      toast.error('O campo "nome" deve ter entre 3 e 255 caracteres.');
      isValid = false;
    }
    if (sobrenome.length < 3 || sobrenome.length > 255) {
      toast.error('O campo "Sobrenome" deve ter entre 3 e 255 caracteres.');
      isValid = false;
    }
    if (!isEmail(email)) {
      toast.error('E-mail inválido.');
      isValid = false;
    }
    if (Number(idade) < 1 || !isInt(String(idade))) {
      toast.error('Idade inválida');
      isValid = false;
    }
    if (Number(peso) <= 0 || !isFloat(String(peso))) {
      toast.error('Peso inválido');
      isValid = false;
    }
    if (Number(altura) <= 0 || !isFloat(String(altura))) {
      toast.error('Altura inválida');
      isValid = false;
    }
    return isValid;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validade()) return;
    setIsLoanding(true);

    try {
      if (id) {
        await axios.put(`alunos/${id}`, aluno);
        toast.success('Aluno atualizado com sucesso.');
      } else {
        await axios.post('/alunos/', aluno);
        toast.success('Aluno registrado com sucesso.');
      }
      setIsLoanding(false);
      navigate('/');
    } catch (e) {
      setIsLoanding(false);
      const status = get(e, 'response.status', 0);
      const errors = get(e, 'response.data.errors', []);

      errors.forEach((error) => toast.error(error));
      if (status === 401) dispatch(actions.loginFailure());
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>{id ? 'Editar Aluno' : 'Novo Aluno'}</Title>
      <Form>
        {id && (
          <ProfilePicture>
            {foto ? (
              <img crossOrigin="anonymous" src={foto} alt={aluno.nome} />
            ) : (
              <FaUserCircle size={180} />
            )}
            <Link to={`/fotos/${id}`}>
              <FaEdit size={24} />
            </Link>
          </ProfilePicture>
        )}

        <label htmlFor="nome">
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            id="nome"
            type="text"
            placeholder="Nome"
          />
        </label>
        <label htmlFor="sobrenome">
          <input
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            id="sobrenome"
            type="text"
            placeholder="Sobrenome"
          />
        </label>
        <label htmlFor="email">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="text"
            placeholder="Email"
          />
        </label>
        <label htmlFor="idade">
          <input
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            id="idade"
            type="number"
            placeholder="Idade"
          />
        </label>
        <label htmlFor="peso">
          <input
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            id="peso"
            type="number"
            placeholder="Peso"
          />
        </label>
        <label htmlFor="altura">
          <input
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            id="altura"
            type="number"
            placeholder="Altura"
          />
        </label>
        {id ? (
          <button onClick={(e) => handleSubmit(e)} type="submit">
            Editar
          </button>
        ) : (
          <button onClick={(e) => handleSubmit(e)} type="submit">
            Enviar
          </button>
        )}
      </Form>
    </Container>
  );
}

FormAluno.protoTypes = {
  params: PropTypes.shape({}).isRequired,
};
