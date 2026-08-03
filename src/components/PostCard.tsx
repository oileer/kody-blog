"use client";

import Link from "next/link";
import type { Post } from "@/lib/posts";

export default function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  return (
    <Link
      href={`/artigo/${post.slug}`}
      className={`reveal${index % 3 ? ` reveal-d${index % 3}` : ""}`}
    >
      <article
        className="post-card"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--line)",
          borderRadius: 14,
          padding: "clamp(20px, 4vw, 28px) clamp(20px, 4vw, 32px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
          <span
            style={{
              background: "var(--bg-soft)",
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
              month: "short",
              year: "numeric",
            })}
          </span>
          <span style={{ color: "var(--muted-2)", fontSize: 12 }}>· {post.tempoLeitura}</span>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-audiowide)",
            fontSize: "clamp(14px, 2vw, 18px)",
            color: "var(--bone)",
            marginBottom: 10,
            lineHeight: 1.35,
          }}
        >
          {post.titulo}
        </h2>

        <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>{post.resumo}</p>

        <span
          style={{
            display: "inline-block",
            marginTop: 14,
            fontSize: 12,
            color: "var(--orange)",
            fontWeight: 600,
            letterSpacing: "0.08em",
            transition: "letter-spacing 0.2s",
          }}
        >
          Ler artigo →
        </span>
      </article>
    </Link>
  );
}
