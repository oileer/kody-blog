import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";

const WHATSAPP = "5549991226005";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.titulo} — Euller Lolato`, description: post.resumo };
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          style={{
            fontFamily: "var(--font-audiowide)",
            fontSize: "clamp(16px, 2.2vw, 22px)",
            color: "var(--bone)",
            marginTop: 40,
            marginBottom: 16,
          }}
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("- **")) {
      const match = line.match(/^- \*\*(.+?)\*\*[:\s]*(.*)/);
      if (match) {
        elements.push(
          <li key={i} style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.8, marginBottom: 8, marginLeft: 20 }}>
            <strong style={{ color: "var(--bone)" }}>{match[1]}:</strong> {match[2]}
          </li>
        );
      }
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={i} style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.8, marginBottom: 8, marginLeft: 20 }}>
          {line.slice(2)}
        </li>
      );
    } else if (line.trim() === "") {
      // skip
    } else {
      elements.push(
        <p key={i} style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>
          {line}
        </p>
      );
    }
    i++;
  }

  return <>{elements}</>;
}

export default async function ArtigoPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const whatsappMsg = encodeURIComponent(
    `Oi Euller! Li seu artigo "${post.titulo}" e quero saber mais.`
  );

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
            maxWidth: 720,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-audiowide)",
              fontSize: 16,
              color: "var(--bone)",
              letterSpacing: "0.06em",
            }}
          >
            EULLER<span style={{ color: "var(--orange)" }}>.</span>
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${whatsappMsg}`}
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

      <article style={{ maxWidth: 720, margin: "0 auto", padding: "64px 24px 96px" }}>
        {/* Meta */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <span
            style={{
              background: "rgba(255,69,0,0.1)",
              color: "var(--orange)",
              borderRadius: 4,
              padding: "3px 10px",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {post.categoria}
          </span>
          <span style={{ color: "var(--muted-2)", fontSize: 12 }}>
            {new Date(post.data).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span style={{ color: "var(--muted-2)", fontSize: 12 }}>· {post.tempoLeitura}</span>
        </div>

        {/* Accent */}
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

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-audiowide)",
            fontSize: "clamp(22px, 4vw, 36px)",
            lineHeight: 1.2,
            color: "var(--bone)",
            marginBottom: 20,
          }}
        >
          {post.titulo}
        </h1>

        <p
          style={{
            fontSize: 18,
            color: "var(--muted)",
            lineHeight: 1.7,
            borderBottom: "1px solid var(--line)",
            paddingBottom: 32,
            marginBottom: 40,
          }}
        >
          {post.resumo}
        </p>

        {/* Content */}
        <div>{renderContent(post.conteudo)}</div>

        {/* WhatsApp CTA inline */}
        <div
          style={{
            marginTop: 56,
            background: "var(--bg-card)",
            border: "1px solid var(--line)",
            borderLeft: "2px solid var(--orange)",
            borderRadius: 14,
            padding: "32px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-audiowide)",
              fontSize: 18,
              color: "var(--bone)",
              marginBottom: 10,
            }}
          >
            Quer aplicar isso no seu negócio?
          </p>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>
            Me chama no WhatsApp e a gente conversa sobre o que faz sentido para você.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: "var(--orange)",
              color: "#fff",
              borderRadius: 8,
              padding: "14px 28px",
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "var(--font-audiowide)",
              letterSpacing: "0.1em",
            }}
          >
            CONVERSAR NO WHATSAPP
          </a>
        </div>

        {/* Back */}
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <Link
            href="/"
            style={{ color: "var(--muted-2)", fontSize: 13, letterSpacing: "0.06em" }}
          >
            ← Voltar para os artigos
          </Link>
        </div>
      </article>
    </main>
  );
}
