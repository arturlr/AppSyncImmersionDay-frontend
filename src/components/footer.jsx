import '../styles/custom.css';

export default function Footer() {
    return (
        <footer id="f" className="custom-main-footer">
            <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                <img className="img" src="https://d0.awsstatic.com/logos/powered-by-aws-white.png" alt="AWS"/>
                <div className="disclaimer">
                  <strong>
                    AnyCompany Reads is a demo application. All content displayed in AnyCompany Reads is for demonstration purposes only.<br/>
                    All images shown are from GoodReads.</strong>
                </div>
            </div>
        </footer>
    );
};