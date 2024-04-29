export default function Loader({ className, size = "md" }) {
    return (
        <div className={`${className}`}>
            <div className="loader-helix" data-size={size}>
                <div className="slice"></div>
                <div className="slice"></div>
                <div className="slice"></div>
                <div className="slice"></div>
                <div className="slice"></div>
                <div className="slice"></div>
            </div>
        </div>
    );
}