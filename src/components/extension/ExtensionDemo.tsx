import { useState } from "react";
import { MonitorPlay, Play, ShieldCheck, Zap } from "lucide-react";
import { extensionDemo } from "@/config/extension";
import { trackEvent } from "@/lib/analytics";

const getYouTubeId = (url: string) => {
  if (!url) return "";

  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname.includes("youtu.be")) {
      return parsedUrl.pathname.slice(1).split("/")[0];
    }
    if (parsedUrl.pathname.startsWith("/shorts/")) {
      return parsedUrl.pathname.split("/")[2] ?? "";
    }
    if (parsedUrl.pathname.startsWith("/embed/")) {
      return parsedUrl.pathname.split("/")[2] ?? "";
    }
    return parsedUrl.searchParams.get("v") ?? "";
  } catch {
    return "";
  }
};

const ExtensionPreview = () => (
  <div className="extension-demo-preview" aria-label="Representação visual da extensão">
    <div className="extension-demo-preview__browser">
      <div className="extension-demo-preview__bar">
        <span />
        <span />
        <span />
        <div>Área de construção</div>
      </div>
      <div className="extension-demo-preview__content">
        <div className="extension-demo-preview__rail" aria-hidden>
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="extension-demo-preview__workspace">
          <div className="extension-demo-preview__status">
            <span>
              <Zap aria-hidden />
              FLUXO ATIVO
            </span>
            <strong>∞</strong>
          </div>
          <div className="extension-demo-preview__pulse" aria-hidden>
            <span />
          </div>
          <div className="extension-demo-preview__lines" aria-hidden>
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="extension-demo-preview__panel">
          <ShieldCheck aria-hidden />
          <strong>Ativação vinculada</strong>
          <small>Período verificado</small>
          <div>
            <span />
          </div>
        </div>
      </div>
    </div>
    <div className="extension-demo-preview__caption">
      <MonitorPlay aria-hidden />
      Demonstração em preparação
    </div>
  </div>
);

const ExtensionDemo = () => {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoId = getYouTubeId(extensionDemo.videoUrl);

  if (!videoId) {
    return <ExtensionPreview />;
  }

  if (!shouldLoadVideo) {
    return (
      <button
        type="button"
        className="extension-demo-poster"
        onClick={() => {
          setShouldLoadVideo(true);
          trackEvent("extension_demo_play", {
            provider: extensionDemo.provider,
          });
        }}
        style={{
          backgroundImage: extensionDemo.posterUrl
            ? `linear-gradient(rgba(5, 4, 7, 0.18), rgba(5, 4, 7, 0.78)), url("${extensionDemo.posterUrl}")`
            : undefined,
        }}
        aria-label={`Reproduzir: ${extensionDemo.title}`}
      >
        <span className="extension-demo-poster__play">
          <Play aria-hidden />
        </span>
        <span>
          <strong>{extensionDemo.title}</strong>
          {extensionDemo.duration && <small>{extensionDemo.duration}</small>}
        </span>
      </button>
    );
  }

  return (
    <div className="extension-demo-player">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={extensionDemo.title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default ExtensionDemo;

