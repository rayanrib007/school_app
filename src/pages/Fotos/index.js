import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import IsLoading from '../../components/Loading/Index';
import { Title, Form } from './styled';

import axios from '../../services/axios';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import * as actionsq from '../../store/modules/auth/actions';

export default function Fotos() {
  const params = useParams();
  const id = get(params, 'id', '');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, 'Fotos[0].url', ''));
        setIsLoading(false);
      } catch (e) {
        toast.error('Não foi possível obter esta imagem');
        setIsLoading(false);
        navigate('/');
      }
    }
    getData();
  }, []);

  async function handleChange(e) {
    console.log(e.target.files);
    const foto = e.target.files[0];
    const fotoURL = URL.createObjectURL(foto);

    setFoto(fotoURL);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', foto);

    console.log(formData);

    try {
      setIsLoading(true);
      await axios.post('/fotos/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setIsLoading(false);
      toast.success('Foto enviada com sucesso');
    } catch (error) {
      const { status } = get(error, 'response', '');
      toast.error('Erro ao enviar foto');
      if (status === 401) dispatch(actions.loginFailure());
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <IsLoading isLoading={isLoading} />
      <Title>Fotos</Title>
      <Form>
        <label htmlFor="foto">
          {foto ? (
            <img src={foto} crossOrigin="anonymous" alt="foto"></img>
          ) : (
            'Selecionar'
          )}
          <input id="foto" type="file" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}
