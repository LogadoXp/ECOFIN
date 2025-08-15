import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Sprout,
  Recycle,
  Globe2,
  Handshake,
  Building2,
  Mail,
  Phone,
  Download,
  Plus,
  Trash2,
  Sun,
  Moon,
  Star,
  FileText,
  ChevronRight,
  Users,
  CheckCircle2,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Badge } from "./components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog";
import { Switch } from "./components/ui/switch";
import { Slider } from "./components/ui/slider";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

// --------------------
// UTILIDADES
// --------------------
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`py-16 md:py-24 ${className}`}>{children}</section>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-2xl border px-3 py-1 text-xs md:text-sm shadow-sm bg-white-50 dark:bg-black-30 backdrop-blur">
    {children}
  </span>
);

// --------------------
// TEMA (Light/Dark)
// --------------------
function useThemeToggle() {
  const [theme, setTheme] = useState("light");

  // Inicializa respeitando o sistema e preferência salva
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("theme");
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const initial = stored || (mql.matches ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");

    // Atualiza se o tema do sistema mudar *e* o usuário não tiver escolhido manualmente
    const onChange = (e) => {
      if (!localStorage.getItem("theme")) {
        const next = e.matches ? "dark" : "light";
        setTheme(next);
        document.documentElement.classList.toggle("dark", next === "dark");
      }
    };
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else if (mql.addListener) mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else if (mql.removeListener) mql.removeListener(onChange);
    };
  }, []);

  // Aplica sempre que o estado mudar
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggle = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try { localStorage.setItem("theme", next); } catch (e) {}
      return next;
    });
  };

  return { theme, toggle };
}

// --------------------
// CALCULADORA DE PEGADA DE CARBONO (simplificada e educacional)
// --------------------
function CarbonCalculator() {
  const [energy, setEnergy] = useState([150]); // kWh/mês
  const [carKm, setCarKm] = useState([300]); // km/mês
  const [meat, setMeat] = useState([7]); // refeições c/ carne por semana

  // fatores médios (aprox. didáticos)
  const co2FromEnergy = energy[0] * 0.06; // kg CO2 / kWh
  const co2FromCar = carKm[0] * 0.192; // kg CO2 / km
  const co2FromMeat = meat[0] * 27 * 4; // kg CO2 / refeição (mês)

  const monthly = co2FromEnergy + co2FromCar + co2FromMeat;
  const yearly = monthly * 12;

  const projection = useMemo(() => {
    // projeção de economia assumindo redução de 3% ao mês com ações sugeridas
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    let current = monthly;
    return months.map((m) => {
      const point = { mes: m, "Emissão (kg)": parseFloat(current.toFixed(1)) };
      current *= 0.97;
      return point;
    });
  }, [monthly]);

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Globe2 className="h-5 w-5"/> Calculadora Eco</CardTitle>
        <CardDescription>Estimativa rápida e educativa da sua pegada mensal de CO₂. Ajuste os controles e veja a projeção de redução.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <Label className="mb-2 block">Energia elétrica (kWh/mês)</Label>
            <Slider value={energy} onValueChange={setEnergy} min={0} max={1000} step={10}/>
            <div className="mt-2 text-sm opacity-80">{energy[0]} kWh → ~{co2FromEnergy.toFixed(1)} kg CO₂</div>
          </div>
          <div>
            <Label className="mb-2 block">Uso de carro (km/mês)</Label>
            <Slider value={carKm} onValueChange={setCarKm} min={0} max={3000} step={10}/>
            <div className="mt-2 text-sm opacity-80">{carKm[0]} km → ~{co2FromCar.toFixed(1)} kg CO₂</div>
          </div>
          <div>
            <Label className="mb-2 block">Refeições com carne (por semana)</Label>
            <Slider value={meat} onValueChange={setMeat} min={0} max={21} step={1}/>
            <div className="mt-2 text-sm opacity-80">{meat[0]} /semana → ~{co2FromMeat.toFixed(1)} kg CO₂/mês</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-emerald-600 dark:bg-emerald-600">
            <CardHeader className="py-3 text-white">
              <CardDescription className="text-white">Estimativa mensal</CardDescription>
              <CardTitle className="text-2xl">{monthly.toFixed(0)} kg CO₂</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-sky-500/100 dark:bg-sky-500/100">
            <CardHeader className="py-3 text-white">
              <CardDescription className="text-white">Estimativa anual</CardDescription>
              <CardTitle className="text-2xl">{yearly.toFixed(0)} kg CO₂</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-pink-500/100 dark:bg-pink-500/100">
            <CardHeader className="py-3 text-white">
              <CardDescription className="text-white" >Meta sugerida</CardDescription>
              <CardTitle className="text-2xl">-3% / mês</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={projection} margin={{ top: 10, right: 24, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes"/>
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="Emissão (kg)" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid   md:grid-cols-3 gap-4 text-sm">
          <Pill><Recycle className="h-4 w-4"/> Troque para LED</Pill>
          <Pill><Sprout className="h-4 w-4"/> 2 refeições sem carne/semana</Pill>
          <Pill><Globe2 className="h-4 w-4"/> Carona/Transporte público 1x/semana</Pill>
        </div>
      </CardContent>
    </Card>
  );
}

// --------------------
// MATERIAIS DO ESTANDE (galeria + anexos em memória)
// --------------------
function MaterialsHub() {
  const [items, setItems] = useState([
    { id: 1, title: "Folder – Visão ECOFIN", type: "PDF", note: "Resumo do propósito e pilares", link: "#" },
    { id: 2, title: "Infográfico – Ciclo de Reciclagem", type: "Imagem", note: "Fluxo simplificado", link: "#" },
    { id: 3, title: "Planilha – Indicadores", type: "XLSX", note: "KPIs do estande", link: "#" },
  ]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("PDF");
  const [note, setNote] = useState("");
  const [link, setLink] = useState("");

  const addItem = () => {
    if (!title) return;
    setItems((prev) => [
      { id: Date.now(), title, type, note, link: link || "#" },
      ...prev,
    ]);
    setTitle(""); setType("PDF"); setNote(""); setLink("");
  };

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const exportJSON = () => {
    const data = JSON.stringify(items, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ecofin-materiais.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((it) => (
              <Card key={it.id} className="rounded-2xl group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="rounded-xl">{it.type}</Badge>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(it.id)}>
                      <Trash2 className="h-4 w-4"/>
                    </Button>
                  </div>
                  <CardTitle className="text-base mt-2 line-clamp-2">{it.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{it.note}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <a href={it.link} target="_blank" rel="noreferrer">
                      <FileText className="mr-2 h-4 w-4"/> Abrir material
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Card className="rounded-2xl h-fit">
          <CardHeader>
            <CardTitle>Adicionar material</CardTitle>
            <CardDescription>Cadastre os itens exibidos no estande.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label>Título</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex.: Catálogo ECOFIN 2025"/>
            </div>
            <div>
              <Label>Tipo</Label>
              <select className="w-full rounded-md border bg-background px-3 py-2" value={type} onChange={(e) => setType(e.target.value)}>
                <option>PDF</option>
                <option>Imagem</option>
                <option>Vídeo</option>
                <option>XLSX</option>
                <option>Link</option>
              </select>
            </div>
            <div>
              <Label>Resumo</Label>
              <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Breve descrição"/>
            </div>
            <div>
              <Label>URL</Label>
              <Input value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://..."/>
            </div>
            <div className="flex gap-2">
              <Button onClick={addItem} className="flex-1"><Plus className="mr-2 h-4 w-4"/> Adicionar</Button>
              <Button variant="secondary" onClick={exportJSON} className="flex-1"><Download className="mr-2 h-4 w-4"/> Exportar</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// --------------------
// PORTFÓLIO / PROVA DE CONCEITO
// --------------------
const SAMPLE_PROJECTS = [
  { id: 1, name: "Monitor Verde", tags: ["IoT", "Energia"], impact: "-18% consumo", desc: "Sensoriamento e automação de iluminação em prédio público.", icon: <Building2 className="h-4 w-4"/> },
  { id: 2, name: "Água 360", tags: ["Água", "Dados"], impact: "-24% desperdício", desc: "Telemetria de hidrômetros e dashboards de alerta.", icon: <Globe2 className="h-4 w-4"/> },
  { id: 3, name: "Lixo Zero Campus", tags: ["Resíduos", "Educação"], impact: "+42% reciclagem", desc: "Campanha + coleta inteligente no ambiente universitário.", icon: <Recycle className="h-4 w-4"/> },
  { id: 4, name: "Carbono Ágil", tags: ["CO₂", "Software"], impact: "Inventário em 2 semanas", desc: "Pipeline para inventário e relatórios de emissões.", icon: <Sprout className="h-4 w-4"/> },
];

function Portfolio() {
  const [filter, setFilter] = useState("Todos");
  const tags = ["Todos", "IoT", "Energia", "Água", "Dados", "Resíduos", "Educação", "CO₂", "Software"];
  const list = SAMPLE_PROJECTS.filter(p => filter === "Todos" || p.tags.includes(filter));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {tags.map(t => (
          <Button key={t} variant={t===filter?"default":"secondary"} onClick={() => setFilter(t)} className="rounded-2xl">
            {t}
          </Button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(p => (
          <motion.div key={p.id} {...fadeUp}>
            <Card className="rounded-2xl h-full">
              <CardHeader>
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">{p.icon}<span className="font-medium">{p.impact}</span></div>
                <CardTitle className="text-xl">{p.name}</CardTitle>
                <CardDescription>{p.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map(tag => (<Badge key={tag} variant="outline" className="rounded-xl">{tag}</Badge>))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --------------------
// INTERAÇÃO ONLINE (pledge + leads)
// --------------------
function Interaction() {
  const [pledges, setPledges] = useState(128);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const leadsRef = useRef([]);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setPledges((n) => n + 1);
    leadsRef.current.push({ ...form, ts: new Date().toISOString() });
    setForm({ name: "", email: "", message: "" });
  };

  const exportLeads = () => {
    const data = JSON.stringify(leadsRef.current, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ecofin-leads.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Handshake className="h-5 w-5"/> Assuma um compromisso</CardTitle>
          <CardDescription>Assine o Pledge ECOFIN e receba ideias práticas.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Nome</Label>
                <Input value={form.name} onChange={e=>setForm(v=>({...v, name: e.target.value}))} placeholder="Seu nome"/>
              </div>
              <div>
                <Label>E-mail</Label>
                <Input type="email" value={form.email} onChange={e=>setForm(v=>({...v, email: e.target.value}))} placeholder="voce@email.com"/>
              </div>
            </div>
            <div>
              <Label>Mensagem (opcional)</Label>
              <Textarea value={form.message} onChange={e=>setForm(v=>({...v, message: e.target.value}))} placeholder="Conte-nos seus objetivos ambientais"/>
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit" className="rounded-2xl"><CheckCircle2 className="mr-2 h-4 w-4"/> Assinar Pledge</Button>
              <Badge variant="secondary" className="rounded-xl">{pledges} apoiadores</Badge>
            </div>
          </form>
          <div className="mt-4">
            <Button variant="outline" onClick={exportLeads} className="rounded-2xl"><Download className="mr-2 h-4 w-4"/> Exportar leads</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5"/> Ações rápidas da comunidade</CardTitle>
          <CardDescription>Pequenos passos com grande impacto coletivo.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {[
            { icon: <Leaf className="h-4 w-4"/>, text: "Plantar 1 árvore este mês" },
            { icon: <Recycle className="h-4 w-4"/>, text: "Separar recicláveis 2x por semana" },
            { icon: <Sprout className="h-4 w-4"/>, text: "2 dias/semana sem carne" },
            { icon: <Globe2 className="h-4 w-4"/>, text: "Ir a pé ou de bike 1x/semana" },
          ].map((a, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl border p-3">
              <div className="flex items-center gap-3 opacity-90">{a.icon}<span>{a.text}</span></div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="rounded-2xl">Marcar</Button>
                </DialogTrigger>
                <DialogContent className="rounded-2xl">
                  <DialogHeader>
                    <DialogTitle>Parabéns! 🎉</DialogTitle>
                  </DialogHeader>
                  <p className="text-sm opacity-80">Sua ação foi registrada localmente. Compartilhe com amigos para aumentar o impacto!</p>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// --------------------
// NAVBAR & FOOTER
// --------------------
function Navbar({ onToggleTheme, theme }) {
  const links = [
    { href: "#sobre", label: "O que é a ECOFIN" },
    { href: "#materiais", label: "Materiais do estande" },
    { href: "#interacao", label: "Interação" },
    { href: "#portfolio", label: "Portfólio" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <div className="sticky top-0 z-50 border-b bg-white/80 dark:bg-neutral-950/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm"><Leaf className="h-5 w-5"/></span>
          <span className="text-lg">ECOFIN</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map(l => <a key={l.href} href={l.href} className="opacity-80 hover:opacity-100 transition">{l.label}</a>)}
        </nav>
        <div className="flex items-center gap-2">

          <a href="#contato"><Button className="rounded-2xl hover:bg-blue-500">Fale conosco</Button></a>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t py-10">
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-3 gap-6 text-sm">
        <div>
          <div className="flex items-center gap-2 font-semibold tracking-tight mb-2"><Leaf className="h-5 w-5"/> ECOFIN</div>
          <p className="opacity-80">Tecnologia e educação ambiental para acelerar a transição sustentável.</p>
        </div>
        <div>
          <div className="font-medium mb-2">Navegação</div>
          <ul className="space-y-1 opacity-80">
            <li><a href="#sobre">O que é</a></li>
            <li><a href="#materiais">Materiais</a></li>
            <li><a href="#interacao">Interação</a></li>
            <li><a href="#portfolio">Portfólio</a></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">Contato</div>
          <div className="flex items-center gap-2 opacity-80"><Mail className="h-4 w-4"/> comercial@ecofin.com</div>
          <div className="flex items-center gap-2 opacity-80 mt-1"><Phone className="h-4 w-4"/> +55 (43) 8864-7717</div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 mt-6 text-xs opacity-60">© {new Date().getFullYear()} Site por Maria Eduarda - ECOFIN. Todos os direitos reservados.</div>
    </footer>
  );
}

// --------------------
// PÁGINA PRINCIPAL
// --------------------
export default function App() {
  const { theme, toggle } = useThemeToggle();

  return (
    <div className="min-h-dvh bg-gradient-to-b from-emerald-50 to-white dark:from-neutral-950 dark:to-neutral-950 text-neutral-900 dark:text-neutral-50">
      <Navbar onToggleTheme={toggle} theme={theme}/>

      {/* HERO */}
      <Section id="home" className="pt-10">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs shadow-sm bg-white/70 dark:bg-black/30 mb-4">
              <Star className="h-3.5 w-3.5"/> Portfólio & Prova de Conceito
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">ECOFIN
              <span className="block text-emerald-600 dark:text-emerald-400">ecologia + finanças inteligentes</span>
            </h1>
            <p className="mt-4 text-lg opacity-80 max-w-prose">
              Unimos educação, dados e tecnologia para transformar metas ambientais em resultados medíveis.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#interacao"><Button className="rounded-2xl"><Handshake className="mr-2 h-4 w-4"/> Participar agora</Button></a>
              <a href="#materiais"><Button variant="secondary" className="rounded-2xl"><FileText className="mr-2 h-4 w-4"/> Ver materiais</Button></a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Pill><Leaf className="h-4 w-4"/> Educação ambiental</Pill>
              <Pill><Globe2 className="h-4 w-4"/> Dados e métricas</Pill>
              <Pill><Recycle className="h-4 w-4"/> Economia circular</Pill>
            </div>
          </motion.div>
          <motion.div {...fadeUp} className="">
            <CarbonCalculator/>
          </motion.div>
        </div>
      </Section>

      {/* SOBRE */}
      <Section id="sobre" className="bg-white/60 dark:bg-neutral-900/40">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-semibold tracking-tight">O que é a ECOFIN</motion.h2>
            <motion.p {...fadeUp} className="mt-4 opacity-80 max-w-prose">
              A ECOFIN é uma iniciativa que integra educação ambiental, tecnologia e modelos financeiros para acelerar projetos sustentáveis.
              No curto prazo, operamos como um estande/POC para demonstrar soluções e engajar pessoas. No longo prazo, atuamos
              como laboratório de inovação para governos, empresas e escolas.
            </motion.p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                { icon: <Leaf className="h-5 w-5"/>, title: "Educação prática", desc: "Ferramentas e conteúdos de fácil aplicação no dia a dia." },
                { icon: <Globe2 className="h-5 w-5"/>, title: "Dados que guiam", desc: "Medição contínua para priorizar ações com mais impacto." },
                { icon: <Recycle className="h-5 w-5"/>, title: "Ciclo completo", desc: "Da conscientização à execução e monitoramento." },
                { icon: <Sprout className="h-5 w-5"/>, title: "Viabilidade financeira", desc: "Modelos que transformam sustentabilidade em resultado." },
              ].map((f, i) => (
                <motion.div key={i} {...fadeUp}>
                  <Card className="rounded-2xl h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                        {f.icon}
                        <CardTitle className="text-lg">{f.title}</CardTitle>
                      </div>
                      <CardDescription>{f.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Manifesto ECOFIN</CardTitle>
                <CardDescription>Três princípios que guiam tudo que fazemos.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-3"><span className="mt-1"><Leaf className="h-4 w-4"/></span><p><strong>Simplicidade eficaz.</strong> Soluções enxutas e aplicáveis hoje.</p></div>
                <div className="flex items-start gap-3"><span className="mt-1"><Globe2 className="h-4 w-4"/></span><p><strong>Transparência de dados.</strong> Métricas claras e auditáveis.</p></div>
                <div className="flex items-start gap-3"><span className="mt-1"><Handshake className="h-4 w-4"/></span><p><strong>Colaboração aberta.</strong> Comunidade no centro das decisões.</p></div>
                <a href="#interacao" className="inline-flex items-center text-sm font-medium mt-2">Participar <ChevronRight className="h-4 w-4"/></a>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* MATERIAIS */}
      <Section id="materiais">
        <div className="mx-auto max-w-7xl px-4">
          <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">Materiais apresentados no estande</motion.h2>
          <p className="opacity-80 mb-6">Centralize aqui folders, infográficos, planilhas e links usados na exposição.</p>
          <MaterialsHub/>
        </div>
      </Section>

      {/* INTERAÇÃO */}
      <Section id="interacao" className="bg-white/60 dark:bg-neutral-900/40">
        <div className="mx-auto max-w-7xl px-4">
          <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">Interação online</motion.h2>
          <p className="opacity-80 mb-6">Participe do pledge, registre ações e receba conteúdos.</p>
          <Interaction/>
        </div>
      </Section>

      {/* PORTFÓLIO */}
      <Section id="portfolio">
        <div className="mx-auto max-w-7xl px-4">
          <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">Portfólio / Prova de Conceito</motion.h2>
          <p className="opacity-80 mb-6">Casos fictícios para demonstrar formato, narrativa de impacto e organização visual.</p>
          <Portfolio/>
        </div>
      </Section>

      {/* CONTATO */}
      <Section id="contato" className="bg-white/60 dark:bg-neutral-900/40">
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">Vamos construir algo juntos?</h3>
            <p className="opacity-80 mt-2">Conte sua necessidade. Retornamos com ideias, escopo e estimativas.</p>
            <div className="mt-6 grid gap-3 text-sm">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4"/> comercial@ecofin.com</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4"/> +55 (43)8864-7717</div>
            </div>
          </div>
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Envie uma mensagem</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e)=>{e.preventDefault(); alert("Mensagem enviada! (demo)");}} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Nome</Label>
                    <Input placeholder="Seu nome" required/>
                  </div>
                  <div>
                    <Label>E-mail</Label>
                    <Input type="email" placeholder="voce@email.com" required/>
                  </div>
                </div>
                <div>
                  <Label>Assunto</Label>
                  <Input placeholder="Qual é o tema?"/>
                </div>
                <div>
                  <Label>Mensagem</Label>
                  <Textarea placeholder="Como podemos ajudar?" rows={5}/>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm opacity-80">
                    <Switch id="newsletter"/>
                    <Label htmlFor="newsletter">Assinar newsletter</Label>
                  </div>
                  <Button type="submit" className="rounded-2xl">Enviar</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Footer/>
    </div>
  );
}
