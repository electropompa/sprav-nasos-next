import Image, { type ImageProps } from "next/image";

type CardImage = Pick<ImageProps, "src"> & Partial<Pick<ImageProps, "width" | "height">>;

type ArchiveCardProps = {
    title: string;
    link: string;
    q?: string;
    h?: string;
    p?: string;
    price?: string;
    image: CardImage
}

const ArchiveCard = ({link, title, q, h, p, price, image}: ArchiveCardProps)=> {
    return (
        <div
            className="ep-product-card wc__content-product product type-product post-7571 status-publish first instock product_cat-mxv product_cat-mnogostupenchatye-nasosy-calpeda product_tag-vertikalnye-nasosy has-post-thumbnail taxable shipping-taxable purchasable product-type-simple">
            <a href={link}
               className="woocommerce-LoopProduct-link woocommerce-loop-product__link">
                <div className="product-card__img">
                    <Image {...image} alt={title}/>
                </div>

                <div className="product-card__content">
                    <h2 className="product-card__title">{title}</h2>

                    <div className="haract pump-params">
                        <div className="product-attribute">
                            Номин. напор: <b>{h} м</b>
                        </div>
                        <div className="product-attribute">
                            Номин. расход: <b>{q} м<sup>3</sup>/ч</b>
                        </div>
                        <div className="product-attribute">
                            Мощность: <b>{p} кВт</b>
                        </div>
                    </div>
                    <span className="price">
                        <span className="woocommerce-Price-amount amount">
                            <bdi>{price}&nbsp;<span className="woocommerce-Price-currencySymbol"
                                                    translate="no">₽</span></bdi>
                        </span>
                        <small className="woocommerce-price-suffix">с НДС</small>
                    </span>
                    <span className="product-details-btn">Подробнее</span>
                </div>
            </a>
        </div>
    );
}

export default ArchiveCard;