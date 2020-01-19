import React, {useState, useEffect} from 'react';
import './Purchase.scss';
// import Input from '../components/Input';
import Button from '../components/Button';
import api from '../services/api';
import send from '../assets/purchase/send.png';
import FixedLogo from '../components/FixedLogo';
import TopLogo from '../components/TopLogo';
import validator from 'validator';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import ModalEmailError from '../components/ModalEmailError';
import '../components/Input.scss'


export default function Purchase({match}){

    const [result, setResult] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [ModalEmailErrorState, setModalEmailErrorState] = useState(false);

    const required = (value) => {
        if (!value.toString().trim().length) {
          return <span className="error">require</span>;
        }
      };
       
      const emaill = (value) => {
        let error = document.querySelector(".error");
        let labelEmail = document.querySelector(".label-email");
        if (!validator.isEmail(value)) {
            if(error){
                labelEmail.style.color = "red";
            }
          return <span className="error">{value} is not a valid email.</span>;
        }else{
            labelEmail.style.color = "#6E6E6E";
        }
      };

      const lt = (value, props) => {
        // get the maxLength from component's props
        if (!value.toString().trim().length > props.m) {
          // Return jsx
          return <span className="error">The value exceeded {props.maxLength} symbols.</span>
        }
      };

    useEffect(() => {
        function loadProduct() {
            let productResult = localStorage.getItem('productPick');
            let product = JSON.parse(productResult);
            setResult(product);
        }
        loadProduct();
    },[match.params.id]);

    async function handlerSubmit(e){
        e.preventDefault();

        let emailInput = document.querySelector("#emailInput");
        let nameInput = document.querySelector("#nameInput");

        if(emailInput.classList.contains("is-invalid-input") === false && email !== "" && nameInput.classList.contains("is-invalid-input") === false && name !== ""){
            let userInfo = {
                "name": name,
                "email": email,
                "id": result.id
               }
    
            await api.post('', userInfo)
            .then(response => {
                let formResponse = document.querySelector('.successResponse');
                let form = document.querySelector('.form');
                form.style.display = "none";
                formResponse.style.display = "block";
            });
        }else{
            setModalEmailErrorState(true);
        }

        
    }


    return (
        <div className="purchase-container">
            <FixedLogo className="purchase"></FixedLogo>
            <TopLogo className="purchase"></TopLogo>
            <div className="row">
                <div className="left-side">
                    <h2>{result.name}</h2>
                    <h3>${result.price}</h3>
                    <img src={result.url} />
                    <ul>
                        
                        {result.sun === "high" ? (
                            <li className="highSun">High sunlight</li>
                        ) : result.sun === "low" ? (
                            <li className="lowSun">Low sunlight</li>
                        ) : result.sun === "no" ? (
                            <li className="noSun">No sunlight</li>
                        ): (
                            <li></li>
                        )}
                        
                        {result.water === "daily" ? (
                            <li className="threeDrop">Water daily</li>
                        ) : result.water === "regularly" ? (
                            <li className="twoDrop">Water regularly</li>
                        ) : result.water === "rarely" ? (
                            <li className="oneDrop">Water rarely</li>
                        ): (
                            <li></li>
                        )}

                        {result.toxicity === true ? (
                            <li className="toxic"><span>Beware!</span> Toxic for pets</li>
                        ) : result.toxicity === false ? (
                            <li className="nonToxic">Non-toxic for pets</li>
                        ) : (
                            <li></li>
                        )}

                    </ul>
                </div>
                <div className="right-side">
                    <Form className="form" onSubmit={handlerSubmit}>
                        <h3>Nice pick!</h3>
                        <h4>Tell us your name and e-mail and we will get in touch regarding your order ;)</h4>
                        <label>Name</label>
                        <Input id="nameInput" type="text" className="name-input" name="name" minLength={9} value={name} onChange={e => setName(e.target.value)}/>
                        <label className="label-email">E-mail</label>
                        <Input id="emailInput" name="email" value={email}  onChange={e => setEmail(e.target.value)}  validations={[required, emaill, lt]}/>
                        <Button type="submit" className="purchase" label="send"/>
                    </Form>
                    {ModalEmailErrorState === true ? <ModalEmailError/> : ""}
                    <div className="successResponse">
                        <div className="response-card">
                            <h3>Thank you!</h3>
                            <h4>You will hear from us soon. Please check your e-mail!</h4>
                            <img src={send} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}