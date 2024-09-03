import styled from 'styled-components';

export const Form = styled.form`
  margin: 10px;
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;

  label {
    display: flex;
    flex-direction: column;
    margin: 5px 0px;

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
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
`;
