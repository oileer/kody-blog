"use client";

import Link from "next/link";
import type { Post } from "@/lib/posts";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/artigo/${post.slug}`}>
      <article
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--line)",
          borderRadius: 14,
          padding: "28px 32px",
          cursor: "pointer",
          transition: "border-color 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--orange)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
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
              month: "short",
              year: "numeric",
            })}
          </span>
          <span style={{ color: "var(--muted-2)", fontSize: 12 }}>· {post.tempoLeitura}</span>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-audiowide)",
            fontSize: "clamp(15px, 2vw, 19px)",
            color: "var(--bone)",
            marginBottom: 10,
            lineHeight: 1.3,
          }}
        >
          {post.titulo}
        </h2>

        <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>{post.resumo}</p>

        <span
          style={{
            display: "inline-block",
            marginTop: 16,
            fontSize: 12,
            color: "var(--orange)",
            fontWeight: 600,
            letterSpacing: "0.08em",
          }}
        >
          Ler artigo →
        </span>
      </article>
    </Link>
  );
}
