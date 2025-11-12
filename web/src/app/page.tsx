'use client';

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";

type SectionKey = "gallery" | "payments" | "clients" | "notifications";

type MediaItem = {
  id: number;
  title: string;
  url: string;
  type: "photo" | "video";
  note: string;
  date: string;
};

type PaymentRecord = {
  id: number;
  client: string;
  service: string;
  amount: number;
  date: string;
  reference: string;
  status: "Pago" | "Pendente";
};

type ClientProfile = {
  id: number;
  tutor: string;
  pet: string;
  plan: string;
  focus: string;
  progress: number;
  nextSession: string;
};

type Notification = {
  id: number;
  title: string;
  message: string;
  audience: "Todos" | "Clientes" | "Equipe";
  scheduledFor: string;
};

const ACCESS_PASSWORD = "adalberto@2024";

const SECTION_LABELS: Record<SectionKey, string> = {
  gallery: "Galeria",
  payments: "Comprovantes",
  clients: "Clientes",
  notifications: "Notificações",
};

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [activeSection, setActiveSection] = useState<SectionKey>("gallery");

  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: 1,
      title: "Aula de socialização",
      url: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80",
      type: "photo",
      note: "Encontro do grupo avançado nas ruas de Copacabana.",
      date: "2024-08-15",
    },
    {
      id: 2,
      title: "Progresso da Luna",
      url: "https://videos.pexels.com/video-files/856980/856980-uhd_2560_1440_30fps.mp4",
      type: "video",
      note: "Exercício de foco e autocontrole no parque.",
      date: "2024-08-12",
    },
  ]);

  const [payments, setPayments] = useState<PaymentRecord[]>([
    {
      id: 1,
      client: "Maria Fernandes",
      service: "Plano Intensivo - 4 semanas",
      amount: 820,
      date: "2024-08-01",
      reference: "PGT-482930",
      status: "Pago",
    },
    {
      id: 2,
      client: "André Silva",
      service: "Aula avulsa",
      amount: 220,
      date: "2024-08-17",
      reference: "PGT-482944",
      status: "Pendente",
    },
  ]);

  const [clients, setClients] = useState<ClientProfile[]>([
    {
      id: 1,
      tutor: "Juliana Maia",
      pet: "Thor",
      plan: "Educação Básica",
      focus: "Obediência e passeio sem puxar",
      progress: 70,
      nextSession: "2024-08-22",
    },
    {
      id: 2,
      tutor: "Ricardo Lopes",
      pet: "Bidu",
      plan: "Correção comportamental",
      focus: "Ansiedade de separação",
      progress: 45,
      nextSession: "2024-08-25",
    },
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Aula coletiva no sábado",
      message:
        "Nos encontramos às 9h no Parcão da Barra. Tragam petiscos preferidos e guia curta.",
      audience: "Clientes",
      scheduledFor: "2024-08-23T09:00",
    },
    {
      id: 2,
      title: "Nova série de vídeos",
      message:
        "Liberei novos vídeos exclusivos com exercícios para filhotes na seção de Galeria.",
      audience: "Todos",
      scheduledFor: "2024-08-20T19:00",
    },
  ]);

  const [mediaForm, setMediaForm] = useState<Omit<MediaItem, "id">>({
    title: "",
    url: "",
    type: "photo",
    note: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const [paymentForm, setPaymentForm] = useState<Omit<PaymentRecord, "id">>({
    client: "",
    service: "",
    amount: 0,
    date: new Date().toISOString().slice(0, 10),
    reference: "",
    status: "Pago",
  });

  const [clientForm, setClientForm] = useState<Omit<ClientProfile, "id">>({
    tutor: "",
    pet: "",
    plan: "",
    focus: "",
    progress: 0,
    nextSession: new Date().toISOString().slice(0, 10),
  });

  const [notificationForm, setNotificationForm] = useState<
    Omit<Notification, "id">
  >({
    title: "",
    message: "",
    audience: "Clientes",
    scheduledFor: new Date().toISOString().slice(0, 16),
  });

  const stats = useMemo(
    () => ({
      clients: clients.length,
      upcoming: clients.filter(
        (client) => client.nextSession >= new Date().toISOString().slice(0, 10),
      ).length,
      receivables: payments
        .filter((payment) => payment.status === "Pendente")
        .reduce((total, record) => total + record.amount, 0),
    }),
    [clients, payments],
  );

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwordInput.trim() === ACCESS_PASSWORD) {
      setAuthenticated(true);
      setPasswordInput("");
    } else {
      setPasswordInput("");
      alert("Senha incorreta. Tente novamente.");
    }
  };

  const handleAddMedia = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMediaItems((previous) => [
      {
        id: Date.now(),
        ...mediaForm,
      },
      ...previous,
    ]);
    setMediaForm({
      title: "",
      url: "",
      type: "photo",
      note: "",
      date: new Date().toISOString().slice(0, 10),
    });
  };

  const handleAddPayment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPayments((previous) => [
      {
        id: Date.now(),
        ...paymentForm,
      },
      ...previous,
    ]);
    setPaymentForm({
      client: "",
      service: "",
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
      reference: "",
      status: "Pago",
    });
  };

  const handleAddClient = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setClients((previous) => [
      {
        id: Date.now(),
        ...clientForm,
      },
      ...previous,
    ]);
    setClientForm({
      tutor: "",
      pet: "",
      plan: "",
      focus: "",
      progress: 0,
      nextSession: new Date().toISOString().slice(0, 10),
    });
  };

  const handleAddNotification = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotifications((previous) => [
      {
        id: Date.now(),
        ...notificationForm,
      },
      ...previous,
    ]);
    setNotificationForm({
      title: "",
      message: "",
      audience: "Clientes",
      scheduledFor: new Date().toISOString().slice(0, 16),
    });
  };

  if (!authenticated) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.35),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(249,115,22,0.35),transparent_55%)]" />
        <div className="w-full max-w-md rounded-3xl border border-cyan-400/40 bg-slate-900/80 p-10 shadow-[0_0_45px_rgba(14,165,233,0.45)] backdrop-blur">
          <div className="mb-8 text-center">
            <span className="text-xs uppercase tracking-[0.5rem] text-cyan-200/60">
              Área Restrita
            </span>
            <h1 className="mt-4 text-3xl font-semibold text-white">
              Painel Adalberto Alves
            </h1>
            <p className="mt-3 text-sm text-slate-300">
              Acesse o ambiente exclusivo para compartilhar treinos, vídeos e
              comprovantes com seus clientes.
            </p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <label className="flex flex-col text-sm text-slate-200">
              Senha de acesso
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(event) => setPasswordInput(event.target.value)}
                className="mt-2 rounded-2xl border border-cyan-400/40 bg-slate-950/60 px-4 py-3 text-base text-slate-100 shadow-[inset_0_0_20px_rgba(56,189,248,0.12)] focus:border-orange-400/80 focus:outline-none focus:shadow-[0_0_25px_rgba(249,115,22,0.45)]"
                placeholder="Digite a senha fornecida pelo treinador"
              />
            </label>
            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-orange-400 px-4 py-3 text-base font-semibold text-slate-950 shadow-[0_0_35px_rgba(56,189,248,0.55)] transition hover:scale-[1.01] hover:shadow-[0_0_45px_rgba(249,115,22,0.55)] focus:outline-none focus:ring-2 focus:ring-orange-300/90"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  const renderSection = (section: SectionKey) => {
    if (section === "gallery") {
      return (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)]">
          <form
            onSubmit={handleAddMedia}
            className="rounded-3xl border border-cyan-400/30 bg-slate-900/70 p-6 shadow-[0_0_45px_rgba(14,165,233,0.25)] backdrop-blur"
          >
            <h2 className="text-lg font-semibold text-white">
              Adicionar novo conteúdo
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              Compartilhe fotos ou vídeos de treinos recentes e marcos dos
              clientes.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="flex flex-col text-sm text-slate-200">
                Título
                <input
                  required
                  value={mediaForm.title}
                  onChange={(event) =>
                    setMediaForm((previous) => ({
                      ...previous,
                      title: event.target.value,
                    }))
                  }
                  className="mt-2 rounded-2xl border border-cyan-400/30 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:border-orange-400/80 focus:outline-none focus:shadow-[0_0_25px_rgba(249,115,22,0.35)]"
                  placeholder="Ex: Aula de socialização"
                />
              </label>
              <label className="flex flex-col text-sm text-slate-200">
                Data
                <input
                  type="date"
                  required
                  value={mediaForm.date}
                  onChange={(event) =>
                    setMediaForm((previous) => ({
                      ...previous,
                      date: event.target.value,
                    }))
                  }
                  className="mt-2 rounded-2xl border border-cyan-400/30 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:border-orange-400/80 focus:outline-none focus:shadow-[0_0_25px_rgba(249,115,22,0.35)]"
                />
              </label>
              <label className="flex flex-col text-sm text-slate-200">
                URL da foto ou vídeo
                <input
                  type="url"
                  required
                  value={mediaForm.url}
                  onChange={(event) =>
                    setMediaForm((previous) => ({
                      ...previous,
                      url: event.target.value,
                    }))
                  }
                  className="mt-2 rounded-2xl border border-cyan-400/30 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:border-orange-400/80 focus:outline-none focus:shadow-[0_0_25px_rgba(249,115,22,0.35)]"
                  placeholder="https://"
                />
              </label>
              <label className="flex flex-col text-sm text-slate-200">
                Tipo de mídia
                <select
                  value={mediaForm.type}
                  onChange={(event) =>
                    setMediaForm((previous) => ({
                      ...previous,
                      type: event.target.value as MediaItem["type"],
                    }))
                  }
                  className="mt-2 rounded-2xl border border-cyan-400/30 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:border-orange-400/80 focus:outline-none focus:shadow-[0_0_25px_rgba(249,115,22,0.35)]"
                >
                  <option value="photo">Foto</option>
                  <option value="video">Vídeo</option>
                </select>
              </label>
            </div>
            <label className="mt-4 flex flex-col text-sm text-slate-200">
              Observações
              <textarea
                value={mediaForm.note}
                onChange={(event) =>
                  setMediaForm((previous) => ({
                    ...previous,
                    note: event.target.value,
                  }))
                }
                className="mt-2 min-h-28 rounded-2xl border border-cyan-400/30 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:border-orange-400/80 focus:outline-none focus:shadow-[0_0_25px_rgba(249,115,22,0.35)]"
                placeholder="Detalhes sobre o treino, orientações para os tutores..."
              />
            </label>
            <button
              type="submit"
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-orange-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_35px_rgba(56,189,248,0.45)] transition hover:scale-[1.01] hover:shadow-[0_0_45px_rgba(249,115,22,0.45)] focus:outline-none focus:ring-2 focus:ring-orange-300/90"
            >
              Publicar conteúdo
            </button>
          </form>

          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mediaItems.map((item) => (
              <article
                key={item.id}
                className="group flex h-full flex-col rounded-3xl border border-cyan-400/20 bg-slate-900/60 p-5 shadow-[0_0_35px_rgba(14,165,233,0.15)] backdrop-blur transition hover:border-orange-300/60 hover:shadow-[0_0_45px_rgba(249,115,22,0.35)]"
              >
                <div className="overflow-hidden rounded-2xl border border-cyan-400/30">
                  {item.type === "photo" ? (
                    <div className="relative h-44 w-full">
                      <Image
                        src={item.url}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                        priority={false}
                      />
                    </div>
                  ) : (
                    <video
                      controls
                      className="h-44 w-full object-cover"
                      src={item.url}
                    />
                  )}
                </div>
                <div className="mt-4 flex flex-1 flex-col gap-2">
                  <div className="flex items-center justify-between text-xs uppercase tracking-widest text-cyan-200/70">
                    <span>{item.type === "photo" ? "Foto" : "Vídeo"}</span>
                    <span>
                      {new Date(item.date).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300">{item.note}</p>
                </div>
              </article>
            ))}
            {mediaItems.length === 0 ? (
              <p className="rounded-3xl border border-dashed border-cyan-400/30 bg-slate-900/40 p-8 text-center text-sm text-slate-300 shadow-[0_0_25px_rgba(14,165,233,0.22)]">
                Você ainda não compartilhou nenhum conteúdo. Use o formulário
                acima para começar a enviar fotos e vídeos.
              </p>
            ) : null}
          </section>
        </div>
      );
    }

    if (section === "payments") {
      return (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,0.35fr)]">
          <section className="space-y-5">
            {payments.map((payment) => (
              <article
                key={payment.id}
                className="rounded-3xl border border-cyan-400/25 bg-slate-900/70 p-6 shadow-[0_0_45px_rgba(14,165,233,0.18)] backdrop-blur"
              >
                <header className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {payment.client}
                    </h3>
                    <p className="text-sm text-slate-300">
                      {payment.service}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest ${payment.status === "Pago" ? "bg-green-400/20 text-green-200" : "bg-orange-400/20 text-orange-200"}`}
                  >
                    {payment.status}
                  </span>
                </header>
                <dl className="mt-5 grid gap-3 text-sm text-slate-200 md:grid-cols-2">
                  <div className="flex flex-col gap-1">
                    <dt className="text-xs uppercase tracking-[0.3em] text-cyan-200/60">
                      Valor
                    </dt>
                    <dd className="text-base font-semibold text-white">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(payment.amount)}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="text-xs uppercase tracking-[0.3em] text-cyan-200/60">
                      Data
                    </dt>
                    <dd>
                      {new Date(payment.date).toLocaleDateString("pt-BR")}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="text-xs uppercase tracking-[0.3em] text-cyan-200/60">
                      Referência
                    </dt>
                    <dd>{payment.reference}</dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="text-xs uppercase tracking-[0.3em] text-cyan-200/60">
                      Observação
                    </dt>
                    <dd>
                      {payment.status === "Pago"
                        ? "Pagamento confirmado e registrado automaticamente."
                        : "Enviar lembrete amigável ao tutor."}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
            {payments.length === 0 ? (
              <p className="rounded-3xl border border-dashed border-cyan-400/30 bg-slate-900/40 p-8 text-center text-sm text-slate-300 shadow-[0_0_25px_rgba(14,165,233,0.22)]">
                Nenhum comprovante registrado até o momento.
              </p>
            ) : null}
          </section>
          <form
            onSubmit={handleAddPayment}
            className="h-fit rounded-3xl border border-cyan-400/30 bg-slate-900/70 p-6 shadow-[0_0_45px_rgba(14,165,233,0.25)] backdrop-blur"
          >
            <h2 className="text-lg font-semibold text-white">
              Registrar comprovante
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              Organize pagamentos concluídos e pendentes dos clientes.
            </p>
            <div className="mt-5 flex flex-col gap-4">
              <label className="flex flex-col text-sm text-slate-200">
                Cliente
                <input
                  required
                  value={paymentForm.client}
                  onChange={(event) =>
                    setPaymentForm((previous) => ({
                      ...previous,
                      client: event.target.value,
                    }))
                  }
                  className="mt-2 rounded-2xl border border-cyan-400/30 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:border-orange-400/80 focus:outline-none focus:shadow-[0_0_25px_rgba(249,115,22,0.35)]"
                  placeholder="Nome do tutor"
                />
              </label>
              <label className="flex flex-col text-sm text-slate-200">
                Serviço contratado
                <input
                  required
                  value={paymentForm.service}
                  onChange={(event) =>
                    setPaymentForm((previous) => ({
                      ...previous,
                      service: event.target.value,
                    }))
                  }
                  className="mt-2 rounded-2xl border border-cyan-400/30 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:border-orange-400/80 focus:outline-none focus:shadow-[0_0_25px_rgba(249,115,22,0.35)]"
                  placeholder="Ex: Treinamento intensivo"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col text-sm text-slate-200">
                  Valor (R$)
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={paymentForm.amount}
                    onChange={(event) =>
                      setPaymentForm((previous) => ({
                        ...previous,
                        amount: Number(event.target.value),
                      }))
                    }
                    className="mt-2 rounded-2xl border border-cyan-400/30 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:border-orange-400/80 focus:outline-none focus:shadow-[0_0_25px_rgba(249,115,22,0.35)]"
                    placeholder="0,00"
                  />
                </label>
                <label className="flex flex-col text-sm text-slate-200">
                  Data
                  <input
                    type="date"
                    required
                    value={paymentForm.date}
                    onChange={(event) =>
                      setPaymentForm((previous) => ({
                        ...previous,
                        date: event.target.value,
                      }))
                    }
                    className="mt-2 rounded-2xl border border-cyan-400/30 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:border-orange-400/80 focus:outline-none focus:shadow-[0_0_25px_rgba(249,115,22,0.35)]"
                  />
                </label>
              </div>
              <label className="flex flex-col text-sm text-slate-200">
                Referência
                <input
                  required
                  value={paymentForm.reference}
                  onChange={(event) =>
                    setPaymentForm((previous) => ({
                      ...previous,
                      reference: event.target.value,
                    }))
                  }
                  className="mt-2 rounded-2xl border border-cyan-400/30 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:border-orange-400/80 focus:outline-none focus:shadow-[0_0_25px_rgba(249,115,22,0.35)]"
                  placeholder="Identificador ou comprovante"
                />
              </label>
              <label className="flex flex-col text-sm text-slate-200">
                Status
                <select
                  value={paymentForm.status}
                  onChange={(event) =>
                    setPaymentForm((previous) => ({
                      ...previous,
                      status: event.target.value as PaymentRecord["status"],
                    }))
                  }
                  className="mt-2 rounded-2xl border border-cyan-400/30 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:border-orange-400/80 focus:outline-none focus:shadow-[0_0_25px_rgba(249,115,22,0.35)]"
                >
                  <option value="Pago">Pago</option>
                  <option value="Pendente">Pendente</option>
                </select>
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-orange-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_35px_rgba(56,189,248,0.45)] transition hover:scale-[1.01] hover:shadow-[0_0_45px_rgba(249,115,22,0.45)] focus:outline-none focus:ring-2 focus:ring-orange-300/90"
            >
              Salvar comprovante
            </button>
          </form>
        </div>
      );
    }

    if (section === "clients") {
      return (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,0.35fr)]">
          <section className="space-y-5">
            {clients.map((client) => (
              <article
                key={client.id}
                className="rounded-3xl border border-cyan-400/20 bg-slate-900/60 p-6 shadow-[0_0_45px_rgba(14,165,233,0.18)] backdrop-blur transition hover:border-orange-300/60 hover:shadow-[0_0_45px_rgba(249,115,22,0.35)]"
              >
                <header className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {client.tutor}
                    </h3>
                    <p className="text-sm text-slate-300">
                      {client.pet} • {client.plan}
                    </p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">
                    Próxima sessão:{" "}
                    {new Date(client.nextSession).toLocaleDateString("pt-BR")}
                  </span>
                </header>
                <p className="mt-4 text-sm text-slate-200">{client.focus}</p>
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-cyan-200/60">
                    <span>Progresso</span>
                    <span>{client.progress}%</span>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-orange-400 shadow-[0_0_20px_rgba(56,189,248,0.45)] transition-all"
                      style={{ width: `${client.progress}%` }}
                    />
                  </div>
                </div>
              </article>
            ))}
            {clients.length === 0 ? (
              <p className="rounded-3xl border border-dashed border-cyan-400/30 bg-slate-900/40 p-8 text-center text-sm text-slate-300 shadow-[0_0_25px_rgba(14,165,233,0.22)]">
                Nenhum cliente cadastrado no momento.
              </p>
            ) : null}
          </section>
          <form
            onSubmit={handleAddClient}
            className="h-fit rounded-3xl border border-cyan-400/30 bg-slate-900/70 p-6 shadow-[0_0_45px_rgba(14,165,233,0.25)] backdrop-blur"
          >
            <h2 className="text-lg font-semibold text-white">Novo cliente</h2>
            <p className="mt-1 text-sm text-slate-300">
              Cadastre tutores e cães para acompanhar os planos e metas.
            </p>
            <div className="mt-5 flex flex-col gap-4">
              <label className="flex flex-col text-sm text-slate-200">
                Nome do tutor
                <input
                  required
                  value={clientForm.tutor}
                  onChange={(event) =>
                    setClientForm((previous) => ({
                      ...previous,
                      tutor: event.target.value,
                    }))
                  }
                  className="mt-2 rounded-2xl border border-cyan-400/30 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:border-orange-400/80 focus:outline-none focus:shadow-[0_0_25px_rgba(249,115,22,0.35)]"
                  placeholder="Nome completo"
                />
              </label>
              <label className="flex flex-col text-sm text-slate-200">
                Nome do cão
                <input
                  required
                  value={clientForm.pet}
                  onChange={(event) =>
                    setClientForm((previous) => ({
                      ...previous,
                      pet: event.target.value,
                    }))
                  }
                  className="mt-2 rounded-2xl border border-cyan-400/30 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:border-orange-400/80 focus:outline-none focus:shadow-[0_0_25px_rgba(249,115,22,0.35)]"
                  placeholder="Nome do pet"
                />
              </label>
              <label className="flex flex-col text-sm text-slate-200">
                Plano
                <input
                  required
                  value={clientForm.plan}
                  onChange={(event) =>
                    setClientForm((previous) => ({
                      ...previous,
                      plan: event.target.value,
                    }))
                  }
                  className="mt-2 rounded-2xl border border-cyan-400/30 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:border-orange-400/80 focus:outline-none focus:shadow-[0_0_25px_rgba(249,115,22,0.35)]"
                  placeholder="Ex: Correção comportamental"
                />
              </label>
              <label className="flex flex-col text-sm text-slate-200">
                Foco principal
                <textarea
                  value={clientForm.focus}
                  onChange={(event) =>
                    setClientForm((previous) => ({
                      ...previous,
                      focus: event.target.value,
                    }))
                  }
                  className="mt-2 min-h-24 rounded-2xl border border-cyan-400/30 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:border-orange-400/80 focus:outline-none focus:shadow-[0_0_25px_rgba(249,115,22,0.35)]"
                  placeholder="Quais comportamentos serão trabalhados?"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col text-sm text-slate-200">
                  Progresso estimado (%)
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={clientForm.progress}
                    onChange={(event) =>
                      setClientForm((previous) => ({
                        ...previous,
                        progress: Number(event.target.value),
                      }))
                    }
                    className="mt-2 rounded-2xl border border-cyan-400/30 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:border-orange-400/80 focus:outline-none focus:shadow-[0_0_25px_rgba(249,115,22,0.35)]"
                    placeholder="0 - 100"
                  />
                </label>
                <label className="flex flex-col text-sm text-slate-200">
                  Próxima sessão
                  <input
                    type="date"
                    required
                    value={clientForm.nextSession}
                    onChange={(event) =>
                      setClientForm((previous) => ({
                        ...previous,
                        nextSession: event.target.value,
                      }))
                    }
                    className="mt-2 rounded-2xl border border-cyan-400/30 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:border-orange-400/80 focus:outline-none focus:shadow-[0_0_25px_rgba(249,115,22,0.35)]"
                  />
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-orange-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_35px_rgba(56,189,248,0.45)] transition hover:scale-[1.01] hover:shadow-[0_0_45px_rgba(249,115,22,0.45)] focus:outline-none focus:ring-2 focus:ring-orange-300/90"
            >
              Adicionar cliente
            </button>
          </form>
        </div>
      );
    }

    return (
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)]">
        <section className="space-y-5">
          {notifications.map((notification) => (
            <article
              key={notification.id}
              className="rounded-3xl border border-cyan-400/20 bg-slate-900/60 p-6 shadow-[0_0_45px_rgba(14,165,233,0.18)] backdrop-blur transition hover:border-orange-300/60 hover:shadow-[0_0_45px_rgba(249,115,22,0.35)]"
            >
              <header className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {notification.title}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/60">
                    {notification.audience}
                  </p>
                </div>
                <span className="text-xs text-slate-300">
                  {new Date(notification.scheduledFor).toLocaleString("pt-BR")}
                </span>
              </header>
              <p className="mt-4 text-sm text-slate-200">
                {notification.message}
              </p>
            </article>
          ))}
          {notifications.length === 0 ? (
            <p className="rounded-3xl border border-dashed border-cyan-400/30 bg-slate-900/40 p-8 text-center text-sm text-slate-300 shadow-[0_0_25px_rgba(14,165,233,0.22)]">
              Nenhuma notificação programada.
            </p>
          ) : null}
        </section>
        <form
          onSubmit={handleAddNotification}
          className="h-fit rounded-3xl border border-cyan-400/30 bg-slate-900/70 p-6 shadow-[0_0_45px_rgba(14,165,233,0.25)] backdrop-blur"
        >
          <h2 className="text-lg font-semibold text-white">Enviar notificação</h2>
          <p className="mt-1 text-sm text-slate-300">
            Informe clientes sobre treinos, lembretes de pagamento e materiais.
          </p>
          <div className="mt-5 flex flex-col gap-4">
            <label className="flex flex-col text-sm text-slate-200">
              Título
              <input
                required
                value={notificationForm.title}
                onChange={(event) =>
                  setNotificationForm((previous) => ({
                    ...previous,
                    title: event.target.value,
                  }))
                }
                className="mt-2 rounded-2xl border border-cyan-400/30 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:border-orange-400/80 focus:outline-none focus:shadow-[0_0_25px_rgba(249,115,22,0.35)]"
                placeholder="Ex: Aula coletiva no sábado"
              />
            </label>
            <label className="flex flex-col text-sm text-slate-200">
              Mensagem
              <textarea
                required
                value={notificationForm.message}
                onChange={(event) =>
                  setNotificationForm((previous) => ({
                    ...previous,
                    message: event.target.value,
                  }))
                }
                className="mt-2 min-h-28 rounded-2xl border border-cyan-400/30 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:border-orange-400/80 focus:outline-none focus:shadow-[0_0_25px_rgba(249,115,22,0.35)]"
                placeholder="Escreva uma mensagem clara para os clientes."
              />
            </label>
            <label className="flex flex-col text-sm text-slate-200">
              Público alvo
              <select
                value={notificationForm.audience}
                onChange={(event) =>
                  setNotificationForm((previous) => ({
                    ...previous,
                    audience: event.target.value as Notification["audience"],
                  }))
                }
                className="mt-2 rounded-2xl border border-cyan-400/30 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:border-orange-400/80 focus:outline-none focus:shadow-[0_0_25px_rgba(249,115,22,0.35)]"
              >
                <option value="Todos">Todos</option>
                <option value="Clientes">Clientes</option>
                <option value="Equipe">Equipe</option>
              </select>
            </label>
            <label className="flex flex-col text-sm text-slate-200">
              Agendar para
              <input
                type="datetime-local"
                required
                value={notificationForm.scheduledFor}
                onChange={(event) =>
                  setNotificationForm((previous) => ({
                    ...previous,
                    scheduledFor: event.target.value,
                  }))
                }
                className="mt-2 rounded-2xl border border-cyan-400/30 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:border-orange-400/80 focus:outline-none focus:shadow-[0_0_25px_rgba(249,115,22,0.35)]"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-orange-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_35px_rgba(56,189,248,0.45)] transition hover:scale-[1.01] hover:shadow-[0_0_45px_rgba(249,115,22,0.45)] focus:outline-none focus:ring-2 focus:ring-orange-300/90"
          >
            Programar envio
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="relative rounded-3xl border border-cyan-400/40 bg-gradient-to-r from-[#041b73] via-[#0ff0ff] to-[#ff7a18] p-[1px] shadow-[0_0_65px_rgba(14,165,233,0.45)]">
          <div className="relative flex flex-col gap-8 rounded-[calc(theme(borderRadius.3xl)+1px)] bg-slate-950/85 px-8 py-10 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 flex-col gap-6 md:flex-row md:items-center">
              <div className="flex h-28 w-28 flex-none items-center justify-center rounded-full border-4 border-orange-400/80 bg-slate-900/80 text-center text-sm font-semibold uppercase tracking-[0.4em] text-orange-200 shadow-[0_0_35px_rgba(249,115,22,0.45)]">
                Foto
              </div>
              <div>
                <h1 className="text-4xl font-semibold text-white">
                  Adalberto Alves
                </h1>
                <p className="mt-1 text-lg font-medium text-orange-300">
                  Personal Dog Training
                </p>
                <p className="mt-4 max-w-xl text-sm text-slate-200">
                  Compartilhe a evolução dos cães, organize comprovantes e mantenha
                  os tutores informados com um painel vibrante e totalmente
                  personalizado para o seu trabalho.
                </p>
              </div>
            </div>
            <div className="grid gap-4 rounded-3xl border border-cyan-300/40 bg-slate-900/60 p-6 text-sm text-slate-200 shadow-[0_0_35px_rgba(14,165,233,0.35)]">
              <div>
                <p className="text-xs uppercase tracking-[0.45em] text-cyan-200/60">
                  Clientes ativos
                </p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {stats.clients}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.45em] text-cyan-200/60">
                  Próximas sessões
                </p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {stats.upcoming}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.45em] text-cyan-200/60">
                  A receber
                </p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(stats.receivables)}
                </p>
              </div>
            </div>
          </div>
        </header>

        <nav className="flex flex-wrap gap-3">
          {(Object.keys(SECTION_LABELS) as SectionKey[]).map((section) => {
            const isActive = activeSection === section;
            return (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`flex items-center justify-center rounded-2xl border px-5 py-3 text-sm font-semibold uppercase tracking-[0.35em] transition focus:outline-none focus:ring-2 focus:ring-orange-400/70 ${
                  isActive
                    ? "border-transparent bg-gradient-to-r from-cyan-400 via-sky-500 to-orange-400 text-slate-950 shadow-[0_0_45px_rgba(56,189,248,0.55)]"
                    : "border-cyan-400/40 bg-slate-900/70 text-slate-200 shadow-[0_0_25px_rgba(14,165,233,0.25)] hover:border-orange-300/70 hover:shadow-[0_0_35px_rgba(249,115,22,0.35)]"
                }`}
              >
                {SECTION_LABELS[section]}
              </button>
            );
          })}
        </nav>

        <main className="space-y-8 pb-16">{renderSection(activeSection)}</main>
      </div>
    </div>
  );
}
