import React, { useMemo } from "react";
import { FormattedPrice } from 'vtex.formatted-price';
import useProduct from "vtex.product-context/useProduct";
import styles from "./billetPrice.css";

export default function BilletPrice() {

    const productContext = useProduct();
    
    const {
        selectedItem
    } = productContext;

    if (!selectedItem || selectedItem === null) return null;

    const {
        selectedItem: {
            sellers
        },
    } = productContext;

    if (!sellers || sellers === null || sellers.length == 0) return null;

    const {
        selectedItem: {
            sellers: [
                {
                    commertialOffer: { 
                        teasers, Price, ListPrice },
                },
            ],
        },
    } = productContext;

    if (!teasers || teasers === null || teasers.length == 0) return null;

    const finalValue = useMemo(() => {
        let prices = new Array;
        if (teasers.length > 0) {
            for (let i = 0; i < teasers.length; ++i) {
                console.log("TEASERS: ", teasers[i]);
                const {
                    conditions: {
                        parameters: [
                            {
                                name: parameterName, value: parameterValue
                            }
                        ]
                    },
                } = teasers[i];
                
                if (parameterValue == 6) {
                    const {
                        effects: {
                            parameters: [
                                {
                                    name: effectName, value: effectValue
                                }
                            ]
                        }
                    } = teasers[i];

                    const discount = parseFloat(effectValue);
                    prices.push(Price - (Price * (discount / 100)));
                }
            }
            return prices.sort();
        }
        return 0;
    }, [teasers]);

    console.log("FINAL VALUE: ", finalValue);

    return (
        <div
            style={{ fontSize: "16px", justifyContent: "flex-start", margin: "0" }}
            class="vtex-store-components-3-x-priceContainer vtex-store-components-3-x-price_className vtex-store-components-3-x-price_className--price-shelf mt3 "
        >
            <div
                style={{ fontSize: "24px" }}
                class="vtex-store-components-3-x-sellingPrice vtex-store-components-3-x-sellingPriceContainer pv1 b c-on-base vtex-store-components-3-x-price_sellingPriceContainer vtex-store-components-3-x-price_sellingPriceContainer--price-shelf"
            >
                {
                    finalValue !== 0 ? (
                        <div className={`flex align-center flex-column ${styles.priceContainer}`}>
                            <FormattedPrice
                                style={{ fontSize: "24px", color: "#000" }}
                                value={finalValue[0]}
                            />
                            <span>
                                {finalValue !== null ? (
                                    <span className={styles.boleto}>
                                        à vista no boleto
                                    </span>
                                ) : (
                                        ""
                                    )}
                            </span>
                        </div>
                    ) : null
                }
            </div>
        </div>
    )
}