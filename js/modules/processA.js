/**
 * Módulo Processo A: Base de Automáticos - O Piloto
 * Versão: 1.1.6-beta
 */
class ProcessA {
    constructor() {
        this.name = 'Base de Automáticos - O Piloto';
        this.version = '1.1.6-beta';
        this.processedWorkbook = null;
    }

    init() {
        console.log(`[${this.name}] Módulo carregado e pronto.`);
    }

    async process(fileArm, fileFp, statusCallback = () => {}) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!window.XLSX) return reject("Biblioteca SheetJS não carregada.");

                // 1. Leitura Binária dos Arquivos
                statusCallback("Lendo Planilha de Armazenagem...");
                const rawArm = await this.readExcel(fileArm);
                
                statusCallback("Lendo Planilha FP98...");
                const rawFp = await this.readExcel(fileFp);

                // 2. Identificação do Cabeçalho Inteligente
                statusCallback("Saneando cabeçalho de Armazenagem...");
                const dataArm = this.identifyHeaderAndClean(rawArm);
                if (dataArm.length === 0) return reject("Cabeçalho de Armazenagem não identificado (Procurei por 'Sigla Filial').");

                // 3. Preparação FP98 - Dicionário de Raiz (7 dígitos)
                statusCallback("Mapeando Raízes CNPJ da FP98...");
                const fpRaizes = new Set();
                rawFp.forEach(row => {
                    const cnpj = String(row['CNJP_CLIENTES'] || Object.values(row)[0] || '').trim();
                    if (cnpj) fpRaizes.add(cnpj.substring(0, 7));
                });

                // 4. Funil de Regras e Cruzamento
                statusCallback("Aplicando Funil de Negócio e Cruzamento...");
                const alerts = [];
                const summary = {}; 

                const filteredData = dataArm.filter(row => {
                    const cod1 = String(row['Código 1'] || '').trim();
                    const tipoVal = String(row['Tipo Valor'] || '').trim().toLowerCase();
                    const dtEntr = row['Dt. Entrega'];
                    const complEmit = String(row['Conhecimentos complementares emitidos'] || '').trim();

                    return cod1 === "" && 
                           tipoVal === "tabela" && 
                           (!dtEntr || dtEntr === "") && 
                           complEmit === "";
                }).map(row => {
                    const cnpj = String(row['CNPJ'] || '').trim();
                    const raiz = cnpj.substring(0, 7);
                    const isFP98 = fpRaizes.has(raiz) ? "SIM" : "NÃO";
                    
                    row['Raiz_CNPJ'] = raiz;
                    row['FP98'] = isFP98;

                    if (row['Dt. Emissão']) row['Dt. Emissão'] = this.formatDate(row['Dt. Emissão']);
                    
                    const grupo = row['Grupo cliente calculo'] || 'SEM GRUPO';
                    const key = `${isFP98} | ${grupo}`;
                    if (!summary[key]) summary[key] = { soma: 0, qtd: 0 };
                    summary[key].soma += parseFloat(row['Vl. Cobrar'] || 0);
                    summary[key].qtd++;

                    return row;
                });

                // 5. Verificação de Alertas (Regra 33 - Média > 3k)
                statusCallback("Analisando indicadores de risco...");
                Object.keys(summary).forEach(key => {
                    const media = summary[key].soma / summary[key].qtd;
                    if (media > 3000) {
                        alerts.push(`⚠️ ${key.split('|')[1]}: Média R$ ${media.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
                    }
                });

                // 6. Preparar Resultado para Download
                statusCallback("Finalizando arquivo 'BD TMS'...");
                const ws = XLSX.utils.json_to_sheet(filteredData);
                this.processedWorkbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(this.processedWorkbook, ws, "BD TMS");

                resolve({
                    success: true,
                    message: `Processado com sucesso! ${filteredData.length} registros filtrados.`,
                    summary: summary,
                    alerts: alerts
                });

            } catch (error) {
                statusCallback(`Erro crítico: ${error.message}`);
                reject(error);
            }
        });
    }

    readExcel(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array', cellDates: true });
                    const sheet = workbook.Sheets[workbook.SheetNames[0]];
                    resolve(XLSX.utils.sheet_to_json(sheet, { defval: "" }));
                } catch (err) { reject(err); }
            };
            reader.onerror = () => reject("Falha física ao ler o arquivo.");
            reader.readAsArrayBuffer(file);
        });
    }

    identifyHeaderAndClean(json) {
        const target = ["sigla filial", "cod. filial", "tipo", "nr. conhecimento"];
        let headerRowIndex = -1;

        for (let i = 0; i < Math.min(json.length, 30); i++) {
            const values = Object.values(json[i]).map(v => String(v).toLowerCase());
            if (target.every(t => values.includes(t))) {
                headerRowIndex = i;
                break;
            }
        }

        if (headerRowIndex === -1) return [];

        const headerKeys = json[headerRowIndex];
        return json.slice(headerRowIndex + 1).map(row => {
            const newRow = {};
            Object.keys(headerKeys).forEach(k => {
                if (headerKeys[k]) newRow[headerKeys[k]] = row[k];
            });
            return newRow;
        });
    }

    formatDate(val) {
        if (!val) return "";
        const d = new Date(val);
        if (isNaN(d.getTime())) return val;
        return d.toLocaleDateString('pt-BR');
    }

    download() {
        if (this.processedWorkbook) {
            XLSX.writeFile(this.processedWorkbook, "Relatorio_Piloto_Mastigado.xlsx");
        } else {
            console.error("Nenhum dado processado disponível para download.");
        }
    }
}

if (!window.processA) {
    window.processA = new ProcessA();
    window.processA.init();
}