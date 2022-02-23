import React, {
    useState,
    useEffect,
    useLayoutEffect
} from "react";
import setCookie from "./setCookie";
import getCookie from "./getCookie.js";
import ReactMarkdown from "react-markdown";

import style from "./styles.css";

function AcceptCookies({ content, button }) {
    function getIp(callback) {
        function response(s) {
            callback(window.userip);

            s.onload = s.onerror = null;
            document.body.removeChild(s);
        }

        function trigger() {
            window.userip = false;

            var s = document.createElement("script");
            s.async = true;
            s.onload = function () {
                response(s);
            };
            s.onerror = function () {
                response(s);
            };

            s.src = "https://l2.io/ip.js?var=userip";
            document.body.appendChild(s);
        }

        if (/^(interactive|complete)$/i.test(document.readyState)) {
            trigger();
        } else {
            document.addEventListener('DOMContentLoaded', trigger);
        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    useLayoutEffect(() => {
        getIp(function (ip) {
            getCookie(ip).then(res => {
                res.json().then(res => {
                    console.log("RESPONSE: ", res);
                    if (res.length == 0) {
                        setIsModalOpen(!isModalOpen);
                    }
                });
            }).catch(err => {
                console.log("ERROR: ", err);
                setIsModalOpen(!isModalOpen);
            });
        });
    }, []);

    const clickHandle = () => {
        getIp(function (ip) {
            setCookie(ip, "sim").then(res => {
                res.json().then(res => {
                    console.log("RESPONSE: ", res);
                    setIsModalOpen(!isModalOpen);
                }).catch(err => {
                    console.log("ERROR: ", err);
                    setIsModalOpen(!isModalOpen);
                });
            });
        });
    }

    useEffect(() => { }, [isModalOpen]);

    return (
        <div className={`${style.lgpdModal} ${isModalOpen ? style.lgpdOpen : ""}`}>
            <p>
                {
                    content ?
                        <ReactMarkdown>{content}</ReactMarkdown>
                        :
                        <>
                            <ReactMarkdown>
                                Utilizamos cookies para lhe proporcionar uma melhor experiência em nosso website. Entenda como usamos os dados coletados na nossa
                            </ReactMarkdown>
                            <a href="/politica-lgpd" target="_blank" rel="noopener noreferrer" >Política LGPD.</a>
                        </>
                }
            </p>
            <button onClick={clickHandle}>{button ? button : "Continuar e Fechar"}</button>
        </div>
    );
}

export default AcceptCookies;

AcceptCookies.schema = {
    type: 'object',
    title: 'Accept Cookies',
    properties: {
        content: {
            type: 'string',
            title: 'Modal Content'
        },
        button: {
            type: 'string',
            title: 'Button Text'
        }
    }
};