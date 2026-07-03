import Image from "next/image";
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

  lines.forEach((line, i) => {
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          style={{
            fontFamily: "var(--font-audiowide)",
            fontSize: "clamp(15px, 2.5vw, 20px)",
            color: "var(--bone)",
            marginTop: 36,
            marginBottom: 14,
          }}
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.match(/^- \*\*.+\*\*/)) {
      const match = line.match(/^- \*\*(.+?)\*\*[:\s]*(.*)/);
      if (match) {
        elements.push(
          <li key={i} style={{ color: "var(--muted)", fontSize: "clamp(14px,2vw,16px)", lineHeight: 1.8, marginBottom: 8, marginLeft: 20 }}>
            <strong style={{ color: "var(--bone)" }}>{match[1]}:</strong> {match[2]}
          </li>
        );
      }
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={i} style={{ color: "var(--muted)", fontSize: "clamp(14px,2vw,16px)", lineHeight: 1.8, marginBottom: 8, marginLeft: 20 }}>
          {line.slice(2)}
        </li>
      );
    } else if (line.trim() !== "") {
      elements.push(
        <p key={i} style={{ color: "var(--muted)", fontSize: "clamp(14px,2vw,16px)", lineHeight: 1.9, marginBottom: 18 }}>
          {line}
        </p>
      );
    }
  });

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
            maxWidth: 720,
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Link href="/">
            <Image
              src="/kody-logo.png"
              alt="KODY"
              width={72}
              height={24}
              style={{ objectFit: "contain" }}
            />
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              border: "1px solid var(--orange)",
              color: "var(--orange)",
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
      </header>

      <article style={{ maxWidth: 720, margin: "0 auto", padding: "48px 20px 80px" }}>
        {/* Meta */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
          <span
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--line)",
              color: "var(--muted)",
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

        <hr
          style={{
            border: 0,
            height: 2,
            width: 48,
            borderRadius: 2,
            background: "linear-gradient(90deg, #FF4500, rgba(255,69,0,0))",
            marginBottom: 24,
          }}
        />

        <h1
          style={{
            fontFamily: "var(--font-audiowide)",
            fontSize: "clamp(20px, 4vw, 32px)",
            lineHeight: 1.2,
            color: "var(--bone)",
            marginBottom: 18,
          }}
        >
          {post.titulo}
        </h1>

        <p
          style={{
            fontSize: "clamp(15px,2vw,17px)",
            color: "var(--muted)",
            lineHeight: 1.75,
            borderBottom: "1px solid var(--line)",
            paddingBottom: 28,
            marginBottom: 36,
          }}
        >
          {post.resumo}
        </p>

        <div>{renderContent(post.conteudo)}</div>

        {/* CTA */}
        <div
          style={{
            marginTop: 52,
            background: "var(--bg-card)",
            border: "1px solid var(--line)",
            borderLeft: "2px solid var(--orange)",
            borderRadius: 14,
            padding: "clamp(24px,5vw,32px)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-audiowide)",
              fontSize: "clamp(15px,2.5vw,18px)",
              color: "var(--bone)",
              marginBottom: 10,
            }}
          >
            Quer aplicar isso no seu negócio?
          </p>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 22 }}>
            Me chama no WhatsApp e a gente conversa.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              border: "1px solid var(--orange)",
              color: "var(--orange)",
              borderRadius: 8,
              padding: "13px 24px",
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

        <div style={{ marginTop: 36, textAlign: "center" }}>
          <Link href="/" style={{ color: "var(--muted-2)", fontSize: 13 }}>
            ← Voltar para os artigos
          </Link>
        </div>
      </article>
    </main>
  );
}
