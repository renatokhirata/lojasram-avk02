import { Link } from 'vtex.render-runtime'
import { useDevice } from 'vtex.device-detector'
import React, { Component } from "react";
import Slider from "react-slick";
import styles from "./styles.css"

const BannerTopoHome = ({ links, perPage }) => {
    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 700,
        autoplaySpeed: 3000,
        appendDots: dots => (
            <div>
                <ul> {dots} </ul>
            </div>
        ),
    };
    const { isMobile } = useDevice(1);

    return (
        <Slider {...settings} className={styles.slider}>
            {
                links.map((item, index) => (

                    <div className={styles.container}>
                        {
                            isMobile ? (
                                <img
                                    className="flex items-center justify-center tc"
                                    src={item.mobile}
                                    alt={item.title}
                                    width="100%"
                                    height="auto"
                                />
                            ) : (
                                <img
                                    className="flex items-center justify-center tc"
                                    src={item.banner}
                                    alt={item.title}
                                    width="100%"
                                    height="auto"
                                />
                            )
                        }
                        <div className={styles.containerText}>
                            <h2>{item.title}</h2>
                            <p>{item.subtitle}</p>
                            <Link to={item.urlButton}>
                                {item.buttonName}
                            </Link>
                        </div>
                    </div>
                )
                )
            }
        </Slider>
    );
}


BannerTopoHome.schema = {
    title: 'Banners Topo Home',
    type: 'object',
    properties: {
        links: {
            title: 'Items',
            type: 'array',
            items: {
                title: 'Item',
                type: 'object',
                properties: {
                    banner: {
                        title: "Banner Principal",
                        type: 'string',
                        widget: {
                            'ui:widget': 'image-uploader',
                        },
                    },
                    mobile: {
                        title: "Mobile banner",
                        type: 'string',
                        widget: {
                            'ui:widget': 'image-uploader',
                        },
                    },
                    urlButton: {
                        title: "Link do banner principal",
                        type: 'string',
                        default: "#"
                    },
                    buttonName: {
                        title: "Texto do botão",
                        type: 'string',
                        default: ""
                    },
                    title: {
                        title: "Título",
                        type: 'string',
                        default: ""
                    },
                    subtitle: {
                        title: "Subtítulo",
                        type: 'string',
                        default: ""
                    }
                }
            },
        }
    },
}

export default BannerTopoHome;