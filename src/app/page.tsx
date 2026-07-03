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
          padding: "20px 0",
          position: "sticky",
          top: 0,
          background: "rgba(10,10,10,0.92)",
          backdropFilter: "blur(12px)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-audiowide)",
              fontSize: 16,
              color: "var(--bone)",
              letterSpacing: "0.06em",
            }}
          >
            EULLER<span style={{ color: "var(--orange)" }}>.</span>
          </span>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "var(--orange)",
              color: "#fff",
              borderRadius: 6,
              padding: "8px 16px",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "var(--font-audiowide)",
            }}
          >
            Falar no WhatsApp
          </a>
        </div>
      </header>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
        {/* Hero / Quem sou eu */}
        <section style={{ padding: "80px 0 64px", borderBottom: "1px solid var(--line)" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--muted-2)",
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 28,
            }}
          >
            <span style={{ color: "var(--orange)", fontFamily: "var(--font-audiowide)" }}>00</span>
            Sobre
          </div>

          <hr
            style={{
              border: 0,
              height: 2,
              width: 64,
              borderRadius: 2,
              background: "linear-gradient(90deg, #FF4500, rgba(255,69,0,0))",
              marginBottom: 28,
            }}
          />

          <h1
            style={{
              fontFamily: "var(--font-audiowide)",
              fontSize: "clamp(28px, 5vw, 48px)",
              lineHeight: 1.1,
              color: "var(--bone)",
              marginBottom: 20,
            }}
          >
            Euller Lolato
          </h1>

          <p
            style={{
              fontSize: "clamp(15px, 2vw, 17px)",
              color: "var(--muted)",
              maxWidth: "58ch",
              lineHeight: 1.8,
              marginBottom: 16,
            }}
          >
            Empreendedor digital especializado em IA aplicada a negócios. Construo sistemas de
            automação que ajudam empresas a estruturar sua presença online, produzir conteúdo e
            vender mais — sem depender de equipes grandes.
          </p>

          <p style={{ fontSize: 15, color: "var(--muted)", maxWidth: "54ch", lineHeight: 1.8 }}>
            Aqui compartilho o que estou aprendendo, testando e construindo. Se você quer aplicar IA
            no seu negócio antes de todo mundo, estamos no lugar certo.
          </p>

          <div style={{ marginTop: 36, display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["IA Aplicada", "Automação", "Conteúdo Digital", "Estratégia"].map((tag) => (
              <span
                key={tag}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--line)",
                  borderRadius: 100,
                  padding: "6px 14px",
                  fontSize: 12,
                  color: "var(--muted)",
                  letterSpacing: "0.06em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Articles */}
        <section style={{ padding: "64px 0" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--muted-2)",
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 40,
            }}
          >
            <span style={{ color: "var(--orange)", fontFamily: "var(--font-audiowide)" }}>01</span>
            Artigos
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        {/* WhatsApp CTA */}
        <section
          style={{
            padding: "64px 0 96px",
            borderTop: "1px solid var(--line)",
          }}
        >
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--line)",
              borderLeft: "2px solid var(--orange)",
              borderRadius: 14,
              padding: "40px 36px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-audiowide)",
                fontSize: "clamp(18px, 3vw, 26px)",
                color: "var(--bone)",
                marginBottom: 12,
              }}
            >
              Quer aplicar IA no seu negócio?
            </p>
            <p
              style={{
                color: "var(--muted)",
                fontSize: 15,
                marginBottom: 28,
                maxWidth: "44ch",
                margin: "0 auto 28px",
              }}
            >
              Me chama no WhatsApp. Posso te ajudar a entender o que faz sentido para a sua realidade.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                background: "var(--orange)",
                color: "#fff",
                borderRadius: 8,
                padding: "14px 32px",
                fontSize: 13,
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
