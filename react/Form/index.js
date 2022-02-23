import React, { useState, useRef } from "react";
import defaults from "./defaults";
import style from "./styles.css";
import Modal from "./modal";

function FaleConosco() {
    const [ data, setData ] = useState([]);
    const [ error, setError ] = useState(false);
    const [ success, setSuccess ] = useState(false);

    const {
        inputs
    } = defaults;

    const formRef = useRef();

    const submitHandler = ev => {
        ev.preventDefault();
        
        console.log(data);

        const url = "/api/dataentities/FC/documents";
        const settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/vnd.vtex.ds.v10+json"
            },
            body: JSON.stringify(data)
        };
        fetch(url, settings).then(res => res.json().then(res => setSuccess(true))).catch(err => setError(true));
    }

    const changeHandler = ev => {
        let name = ev.currentTarget.name;
        let value = ev.currentTarget.value;

        setData({...data, [name]: value});
    }

    return (
        <>
            <form id="formFaleConosco" className={style.form} onSubmit={submitHandler} ref={formRef}>
                {Object.keys(inputs).map(key => {
                    if (inputs[key].type == "input") {
                        return <input id={key} name={key} required={inputs[key].required ? "required" : null} placeholder={`${inputs[key].name}:`} onChange={changeHandler} />
                    } else if (inputs[key].type == "select") {
                        return (
                            <select id={key} name={key} required={inputs[key].required ? "required" : null} onChange={changeHandler}>
                                <option>{inputs[key].name}</option>
                                {inputs[key].options.map(option => <option value={option}>{option}</option>)}
                            </select>
                        )
                    } else if (inputs[key].type == "textarea") {
                        return <textarea id={key} name={key} required={inputs[key].required ? "required" : null} placeholder={`${inputs[key].name}:`} onChange={changeHandler}></textarea>
                    }
                })}
                <input type='submit' value="Enviar" className={style.buttonEnv} />
            </form>
            {success ? <Modal props={{success: true, message: "Seus dados foram gravados com sucesso"}} /> : null}
            {error ? <Modal props={{success: false, message: "Houve um erro ao tentar gravar seus dados"}} /> : null}
        </>
    );
}

export default FaleConosco;