import React from 'react'
import { useForm } from "react-hook-form"
import { isEmail } from "validator"
import './form-teste-module.css'

const FormTeste = () => {

  const [uf, setUf] = React.useState('');
  const [listUf, setListUf] = React.useState([]);
  const [city, setCity] = React.useState('');
  const [listCity, setListCity] = React.useState([]);

  function loadUf() {
    let url = 'https://servicodados.ibge.gov.br/';
    url = url + 'api/v1/localidades/estados';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        data.sort((a, b) => a.nome.localeCompare(b.nome));
        setListUf([...data]);
      });
  }
  function loadCity(id) {
    let url = 'https://servicodados.ibge.gov.br/api/v1/';
    url = url + `localidades/estados/${id}/municipios`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        data.sort((a, b) => a.nome.localeCompare(b.nome));
        setListCity([...data]);
      });
  }
  React.useEffect(() => {
    loadUf();
  }, []);
  React.useEffect(() => {
    if (uf) {
      loadCity(uf);
    }
  }, [uf]);

  const { register,
    handleSubmit,
    formState: { errors },
    watch } = useForm()

  const passWatch = watch('senha')

  const onSubmit = (event) => {
    alert(JSON.stringify(event))
  }

  return (
    <div className="form-group">
      <div>
        <h1>Faça seu cadastro</h1>
      </div>
      <form onSubmit={(handleSubmit(onSubmit))}>
        <div className="container-input">
          <input {...register("nome", { required: true })}
            className={errors?.nome && "input-error"}
            placeholder="Nome"
            type="text"
          />
          {errors?.nome?.type === "required" && (
            <p className="error-message">O nome é obrigatório.</p>
          )}
        </div>

        <div className="container-input">
          <input {...register("cpf", { required: true, minLength: 11 })}
            className={errors?.cpf && "input-error"}
            placeholder="CPF"
            type="tel"
          />
          {errors?.cpf?.type === "required" && (
            <p className="error-message">O cpf é obrigatório.</p>
          )}
          {errors?.cpf?.type === "minLength" && (
            <p className="error-message">
              O cpf precisa ter 11 caracteres.
            </p>
          )}
        </div>

        <div className="container-input">
          <input {...register("email", { required: true, validate: (value) => isEmail(value), })}
            className={errors?.email && "input-error"}
            placeholder="E-mail"
            type="text"
          />
          {errors?.email?.type === "required" && (
            <p className="error-message">O e-mail é obrigatório.</p>
          )}
          {errors?.email?.type === "validate" && (
            <p className="error-message">Formato de e-mail inválido.</p>
          )}
        </div>


        <div className="container-input">
          <input {...register("senha", { required: true, minLength: 8 })}
            className={errors?.senha && "input-error"}
            placeholder="Senha"
            type="password"
          />
          {errors?.senha?.type === "required" && (
            <p className="error-message">A senha é obrigatória.</p>
          )}
          {errors?.senha?.type === "minLength" && (
            <p className="error-message">
              A senha precisa ter ao menos 8 caracteres.
            </p>
          )}
        </div>

        <div className="container-input">
          <input {...register("confirmacaoSenha", { required: true, validate: (value) => value == passWatch })}
            className={errors?.confirmacaoSenha && "input-error"}
            placeholder="Confirmação de senha"
            type="password"
          />
          {errors?.confirmacaoSenha?.type === "required" && (
            <p className="error-message">A confirmação de senha é obrigatória.</p>
          )}

          {errors?.confirmacaoSenha?.type === "validate" && (
            <p className="error-message">As senhas não conferem.</p>
          )}
        </div>


        <div className="container-input">
          <input {...register("tel", { required: true, minLength: 11 })}
            className={errors?.tel && "input-error"}
            placeholder="Telefone"
            type="tel"
          />
          {errors?.tel?.type === "required" && (
            <p className="error-message">O telefone é obrigatório.</p>
          )}

          {errors?.tel?.type === "minLength" && (
            <p className="error-message">
              O telefone precisa ter 11 caracteres, incluindo o DDD.
            </p>
          )}
        </div>

        <div>
          <select {...register('uf')} value={uf} onChange={e => setUf(e.target.value)}>
            {listUf.map((a, b) => (
              <option value={a.id}>{a.sigla} - {a.nome}</option>
            ))}
          </select>
          <select {...register('city')} value={city} onChange={e => setCity(e.target.value)}>
            {listCity.map((a, b) => (
              <option value={a.sigla}>{a.nome}</option>
            ))}
          </select>
        </div>

        <div className="container-input">
          <input {...register("termos", { required: true })}
            className={errors?.termos && "input-error"}
            type="checkbox"
          />
          <label>Li e aceito os termos e condições</label>
          {errors?.termos?.type === "required" && (
            <p className="error-message">Aceitar os termos de uso é obrigatório.</p>
          )}
        </div>
        <div className='form-group'>
          <input type="submit" />
        </div>

      </form>
    </div >
  )
}

export { FormTeste }