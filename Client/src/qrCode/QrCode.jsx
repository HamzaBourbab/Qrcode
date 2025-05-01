import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
import React, { useState, useEffect } from "react";
import { AiFillCopy, AiOutlineDownload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./qrCode.css"; // if you want to separate style

function QrCode() {
  const [qrData, setQrData] = useState("");
  const [canvasURL, setCanvasURL] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    // Generate random string on login
    const generateRandomData = () => {
      const random = Math.random().toString(36).substring(2, 10);
      setQrData(`QR-${random}-${Date.now()}`);
    };
    generateRandomData();
  }, []);

  const QrCodeDownload = async () => {
    const canvas = await html2canvas(document.getElementById("canvas"));
    const dataURL = canvas.toDataURL();
    const a = document.createElement("a");
    a.download = "QrCode.png";
    a.href = dataURL;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const QrCodeCopy = async () => {
    const canvas = await html2canvas(document.getElementById("canvas"));
    const dataURL = canvas.toDataURL();
    setCanvasURL(dataURL);
    navigator.clipboard.writeText(dataURL);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    logout(); // from AuthContext
    navigate("/login");
  };

  return (
    <>
      <main>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Generate your QR Code</h1>
          <button className="signout-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>

        <div className="mb-4">
          <label>Auto-generated QR Code Data</label>
          <input type="text" value={qrData} readOnly />
          <button onClick={QrCodeDownload} className="DownloadButton">
            <AiOutlineDownload /> Download
          </button>
          <button onClick={QrCodeCopy} className="CoppyButton">
            <AiFillCopy /> Copy
          </button>
        </div>

        <article className="card">
          <div id="canvas" className="qr-box">
            <QRCodeCanvas
              value={qrData}
              size={250}
              bgColor={"#ffffff"}
              fgColor={"#0a75ad"}
              level={"H"}
              includeMargin={false}
            />
          </div>
          <p>Each login creates a unique QR Code automatically.</p>
        </article>
      </main>
    </>
  );
}

export default QrCode;
