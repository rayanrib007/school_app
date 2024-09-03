import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;

  label {
    display: flex;
    flex-direction: column;
    margin: 5px 0px;
    padding: 5px 0 0 0;

    input {
      height: 40px;
      padding: 0 10px;
      border-radius: 4px;
      border: 1px solid #ddd;
      font-size: 1.1rem;
    }
  }

  button {
    margin-top: 10px;
  }
`;
export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  position: relative;
  margin-top: 20px;

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    position: absolute;
    bottom: 0;
    color: #fff;
    background: ${colors.primaryColor};
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

export const Title = styled.h1`
  text-align: center;
`;
