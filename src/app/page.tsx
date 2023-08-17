"use client";

import { Trash2, Stars, Loader, Loader2 } from "lucide-react";
import { useState } from "react";

import { Label } from "~/components/Label";
import { Logo } from "~/components/Logo";
import { MyEditor } from "~/components/MyEditor";

export default function Home() {
  const isLoading = false;
  const [schema, setSchema] = useState(
    `CREATE TABLE IF NOT EXISTS "chats" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "title" text,
      "atlas_user_id" uuid NOT NULL,
      "created_at" timestamp DEFAULT now()
  );`
  );

  const result = `
SELECT c.id, c.title
FROM chats c
INNER JOIN (
     SELECT chat_id, COUNT(*) AS message_count
      FROM messages
      GROUP BY chat_id
) m ON c.id = m.chat_id
WHERE m.message_count >= 4;

  `;

  return (
    <div className="max-w-xl m-auto px-4 pt-12 pb-4 ">
      <header className="flex items-center justify-between">
        <Logo />
        <button type="button">
          <Trash2 className="h-8 w-8 text-white" strokeWidth={0.8} />
        </button>
      </header>
      <form className="flex flex-col gap-8 my-8">
        <div className="flex flex-col gap-4">
          <Label htmlFor="">Cole seu código SQL aqui</Label>
          <MyEditor value={schema} onValueChange={setSchema} />
        </div>

        <div className="flex flex-col gap-4">
          <Label htmlFor="">Faça uma pergunta sobre o código </Label>
          <textarea
            className="bg-blueberry-600 border border-blueberry-300 rounded-md px-4 py-3 text-white outline-none focus:ring-2 focus:ring-pistachio"
            placeholder="Ex: Me liste todos os chats que possuem pelo menos 4 mensagens"
          />
          <button
            type="submit"
            className="flex items-center gap-1 justify-center text-pistachio border border-pistachio h-12 rounded-lg disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? <Loader className="animate-spin" /> : <Stars />}
            Perguntar à inteligência artificial
          </button>
        </div>
      </form>
      <div className="flex flex-col gap-4">
        <Label>Resposta</Label>
        <MyEditor readOnly value={result} onValueChange={() => {}} />
      </div>
    </div>
  );
}
