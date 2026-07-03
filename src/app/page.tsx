import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

const WHATSAPP = "5549991226005";
const WHATSAPP_MSG = encodeURIComponent(
  "Oi Euller! Vi seu blog e quero saber mais sobre IA para o meu negócio."
);

export default function Home() {
  const posts = getAllPosts();

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid var(--line)",
          padding: "16px 0",
          position: "sticky",
          top: 0,
          background: "rgba(10,10,10,0.95)",
          backdropFilter: "blur(12px)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Image
            src="/kody-logo.png"
            alt="KODY"
            width={72}
            height={24}
            style={{ objectFit: "contain", flexShrink: 0 }}
          />
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <a
              href="https://kodyos.eullerlolato.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "var(--orange)",
                color: "#fff",
                borderRadius: 6,
                padding: "8px 14px",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: "var(--font-audiowide)",
                whiteSpace: "nowrap",
                transition: "opacity 0.15s",
              }}
            >
              KODY OS
            </a>
            <a
              href="https://brandbooks.eullerlolato.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                border: "1px solid var(--line)",
                color: "var(--muted)",
                borderRadius: 6,
                padding: "8px 14px",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "var(--font-audiowide)",
                whiteSpace: "nowrap",
              }}
            >
              Brand Books
            </a>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                border: "1px solid var(--line)",
                color: "var(--muted)",
                borderRadius: 6,
                padding: "8px 14px",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "var(--font-audiowide)",
                whiteSpace: "nowrap",
              }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 20px" }}>
        {/* Hero / Quem sou eu */}
        <section className="hero-section" style={{ padding: "60px 0 52px", borderBottom: "1px solid var(--line)" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--muted-2)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <span style={{ color: "var(--orange)", fontFamily: "var(--font-audiowide)" }}>00</span>
            Sobre
          </div>

          <hr
            className="anim-slide-right delay-1"
            style={{
              border: 0,
              height: 2,
              borderRadius: 2,
              background: "linear-gradient(90deg, #FF4500, rgba(255,69,0,0))",
              marginBottom: 28,
            }}
          />

          {/* Foto + texto lado a lado */}
          <div
            style={{
              display: "flex",
              gap: "clamp(20px, 4vw, 40px)",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {/* Foto */}
            <div className="anim-scale-in delay-2" style={{ flexShrink: 0 }}>
              <Image
                src="/euller.jpg"
                alt="Euller Lolato"
                width={120}
                height={120}
                className="avatar-ring"
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid var(--line)",
                }}
              />
            </div>

            {/* Texto */}
            <div className="anim-fade-up delay-3" style={{ flex: 1, minWidth: 220 }}>
              <h1
                style={{
                  fontFamily: "var(--font-audiowide)",
                  fontSize: "clamp(22px, 4vw, 38px)",
                  lineHeight: 1.1,
                  color: "var(--bone)",
                  marginBottom: 14,
                }}
              >
                Euller Lolato
              </h1>

              <p
                style={{
                  fontSize: "clamp(14px, 2vw, 16px)",
                  color: "var(--muted)",
                  lineHeight: 1.8,
                  marginBottom: 12,
                }}
              >
                Empreendedor digital especializado em IA aplicada a negócios. Construo sistemas de
                automação que ajudam empresas a estruturar sua presença online, produzir conteúdo e
                vender mais — sem depender de equipes grandes.
              </p>

              <p
                style={{
                  fontSize: "clamp(14px, 2vw, 15px)",
                  color: "var(--muted)",
                  lineHeight: 1.8,
                }}
              >
                Aqui compartilho o que estou aprendendo, testando e construindo. Se você quer
                aplicar IA no seu negócio antes de todo mundo, estamos no lugar certo.
              </p>

              <div style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["IA Aplicada", "Automação", "Conteúdo Digital", "Estratégia"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--line)",
                      borderRadius: 100,
                      padding: "5px 12px",
                      fontSize: 11,
                      color: "var(--muted)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Articles */}
        <section style={{ padding: "52px 0" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--muted-2)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 32,
            }}
          >
            <span style={{ color: "var(--orange)", fontFamily: "var(--font-audiowide)" }}>01</span>
            Artigos
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </section>

        {/* WhatsApp CTA */}
        <section style={{ padding: "0 0 80px", borderTop: "1px solid var(--line)", paddingTop: 52 }}>
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--line)",
              borderLeft: "2px solid var(--orange)",
              borderRadius: 14,
              padding: "clamp(28px, 5vw, 40px)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-audiowide)",
                fontSize: "clamp(16px, 3vw, 24px)",
                color: "var(--bone)",
                marginBottom: 10,
              }}
            >
              Quer aplicar IA no seu negócio?
            </p>
            <p
              style={{
                color: "var(--muted)",
                fontSize: 14,
                marginBottom: 24,
                maxWidth: "40ch",
                margin: "0 auto 24px",
              }}
            >
              Me chama no WhatsApp. A gente conversa sobre o que faz sentido para você.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                border: "1px solid var(--orange)",
                color: "var(--orange)",
                borderRadius: 8,
                padding: "13px 28px",
                fontSize: 12,
                fontWeight: 700,
                fontFamily: "var(--font-audiowide)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Conversar no WhatsApp
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
