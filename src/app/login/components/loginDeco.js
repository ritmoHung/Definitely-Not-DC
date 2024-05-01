export default function LoginDeco({ className }) {
    return (
        <div className={`${className} relative grid [&_>_*]:absolute [&_>_*]:size-[1em]`}>
            <div className="triangle-grad-sp-1 scale-[6] rotate-[30deg]
                            left-[10%] top-0
                            md:left-[10%] md:top-1/3
                            2xl:left-[30%] 2xl:top-1/4"></div>
            <div className="triangle-grad      scale-[3] -rotate-[60deg]
                            left-[30%] top-1/5
                            md:left-[20%] md:top-3/5
                            2xl:left-[40%] 2xl:top-[45%]"></div>

            <div className="triangle-grad-sp-2 scale-[10] -rotate-[75deg]
                            left-[85%] top-1/3
                            md:left-[82%] md:top-1/4
                            2xl:left-1/2 2xl:top-[65%]"></div>
            <div className="triangle-grad      scale-[16] rotate-[30deg]
                            left-[15%] top-[70%]
                            md:left-[85%] md:top-2/3
                            2xl:left-3/4"></div>
        </div>
    );
}