export default function LoginFooter({ className }) {
    return (
        <div className={`${className} grid grid-flow-row md:grid-cols-[1fr_auto_auto]
                        justify-items-center md:justify-items-start
                        gap-x-8 gap-y-4 fixed w-screen left-0 bottom-0 p-8 text-center text-accent text-fineprint`}>
            <span></span>
            <a id="term-of-usage" href="https://youtu.be/_ND3EtQZ-yY" target="_blank" rel="noopener noreferrer">使用條款</a>
            <a id="privacy-policy" href="https://youtu.be/_ND3EtQZ-yY" target="_blank" rel="noopener noreferrer">隱私政策</a>
        </div>
    );
}