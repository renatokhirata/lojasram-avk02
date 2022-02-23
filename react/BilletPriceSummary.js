import React, { useMemo } from "react"
import { FormattedPrice } from 'vtex.formatted-price'
import useProduct from "vtex.product-context/useProduct"
import style from "./billePriceSummary.css"

export default function BilletPriceSummary() {
    const productContext = useProduct()
    console.log(productContext)
    const {
        selectedItem
    } = productContext

    if (!selectedItem || selectedItem === null) return null

    const {
        selectedItem: {
            sellers
        },
    } = productContext

    if (!sellers || sellers === null || sellers.length == 0) return null

    const {
        selectedItem: {
            sellers: [
                {
                    commertialOffer: { teasers, Price, ListPrice },
                },
            ],
        },
    } = productContext

    const promo1 = useMemo(() => {
        if (teasers && teasers.length) {
            return teasers.find((item) => item.name === "Desconto Cartão 5%")
        }

        return null
    }, [teasers])

    const promo2 = useMemo(() => {
        if (teasers && teasers.length) {
            return teasers.find((item) => item.name === "Desconto Boleto 10%")
        }

        return null
    }, [teasers])

    const finalValue1 = useMemo(() => {
        // if (promo1) {
            return Price * 0.1
        // }

        // return 0
    }, [promo1])

    const finalValue2 = useMemo(() => {
        // if (promo2) {
            return Price * 0.05
        // }

        // return 0
    }, [promo2])

    return (
        <div
            style={{ fontSize: "14px", justifyContent: "flex-start", margin: "0" }}
            class="vtex-store-components-3-x-priceContainer vtex-store-components-3-x-price_className vtex-store-components-3-x-price_className--price-shelf mt3 "
        >
            {/* <div class="vtex-store-components-3-x-listPrice t-small-s t-small-ns c-muted-2 mb2 vtex-store-components-3-x-price_listPriceContainer vtex-store-components-3-x-price_listPriceContainer--price-shelf">
                {ListPrice !== Price ? (
                    <div
                        className=""
                        style={{
                            fontWeight: "400",
                            marginRight: "10px",
                            color: "#b1b2b5",
                            fontSize: "12px",
                            textTransform: "uppercase",
                            textDecoration: "line-through",
                        }}
                    >
                        <FormattedPrice value={ListPrice} />
                    </div>
                ) : null}
            </div> */}
            <div
                className={style.billetPriceContainer}
            >
                {
                    Price !== 0 ? (
                        <>
                            <FormattedPrice
                                value={Price - finalValue1}
                            />
                            <span>
                                {finalValue1 !== null ? (
                                    <span className={style.boleto}>
                                        no boleto
                                    </span>
                                ) : (
                                        ""
                                    )}
                            </span>
                        </>
                    ) : null
                }
            </div>
        </div>
    )
}