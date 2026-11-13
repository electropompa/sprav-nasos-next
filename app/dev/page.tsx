import ArchiveCard from "@/app/dev/ArchiveCard";

export default function UiKit(){
    return (
        <article>
            <ArchiveCard
                link='/nasosy/calpeda/mnogostupenchatye-nasosy-calpeda/100-6501/'
                title='Вертикальный многоступенчатый насос Calpeda MXV 100-6501'
                q="20.3"
                h="60"
                p="5.5"
                price="150 765"
                image={{
                    src: "/img/products/calpeda/mxv/mxv-series.webp",
                    width: 350,
                    height: 350,
                }} />
        </article>
    )
}