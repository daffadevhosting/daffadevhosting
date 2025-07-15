### [daffadevhosting.github.io/generate/](https://daffadevhosting.github.io/generate)

### 💰 Perhitungan Biaya Per Paket

| Paket        | Model                                          | Estimasi Neuron / Generate | Harga per Generate | Target Jumlah Generate | Total Biaya   | Harga Jual Aman  |
| ------------ | ---------------------------------------------- | -------------------------- | ------------------ | ---------------------- | ------------- | ---------------- |
| **Medium**   | `@cf/meta/llama-3.2-3b-instruct`               | 5.000                      | \$0.055            | 30×                    | \$1.65        | Rp **30.000**    |
| **Advanced** | `@cf/mistral/mistral-7b-instruct-v0.2-lora`    | 6.000                      | \$0.066            | 30×                    | \$1.98        | Rp **40.000**    |
| **Expert**   | `@cf/deepseek-ai/deepseek-r1-distill-qwen-32b` | 10.000–12.000              | \$0.55–\$0.66      | 20×                    | \$11.00–13.20 | Rp **200.000++** |


### ✅ Rekomendasi Paket

| Paket        | Limit        | Harga Aman | Fitur                                           |
| ------------ | ------------ | ---------- | ----------------------------------------------- |
| **Medium**   | 30x generate | Rp 30.000  | LLaMA 3B: cepat, murah                          |
| **Advanced** | 30x generate | Rp 45.000  | Mistral 7B: hasil lebih stabil, lebih pintar    |
| **Expert**   | 20x generate | Rp 200.000 | Deepseek 32B: powerful, reasoning, mahal banget |


### ⚙️ Dasar Perhitungan
Cloudflare AI harga per 10.000 neuron = $0.11
Estimasi 1x generate = 4000–6000 neuron (ambil rata-rata 5000 neuron)
Jadi:

- 1x generate = $0.055
- Kurs asumsikan: Rp 16.000/USD

## 💳 Paket & Biaya Produksi

### 🟦 Medium (LLaMA 3B)
- Model: @cf/meta/llama-3.2-3b-instruct
- Estimasi biaya 1x generate = $0.055
- Paket: 25x generate
- Total biaya: 25 x $0.055 = $1.375 → Rp 22.000
- Saran harga jual: Rp 29.000 (profit ±30%)

### 🟨 Advanced (Mistral 7B)
- Model: @cf/mistral/mistral-7b-instruct-v0.2-lora
- Estimasi biaya sama, karena pricing sama dengan LLaMA = $0.11 per 10K neuron
- Paket: 25x generate
- Total biaya: Rp 22.000
- Saran harga jual: Rp 29.000 (profit ±sama)

### 🟩 Expert (Deepseek R1 Distill 32B)
- Model: @cf/deepseek-ai/deepseek-r1-distill-qwen-32b
- Harga input: $0.50/M, output: $4.88/M
- Estimasi:
    - 2500 token input (2.5K) = $0.00125
    - 2500 token output = $0.0122
    - Total ≈ $0.0135 / 1x generate
    - 25x generate = $0.3375 → ±Rp 5.400

- Saran harga jual:
    - Rp 12.500 (kalau mau cuan 2x lipat)
    - Bisa juga bikin paket 50x = Rp 25.000

## 💡 Tambahan Strategi
- Gratis: Qwen 1.8B, 2x generate
- Medium: LLaMA 3B → Rp 29rb
- Advanced: Mistral 7B → Rp 29rb
- Expert: Deepseek 32B → Rp 12.500 (25x) atau Rp 25.000 (50x)

## ✅ Paket Pricing Final

| Paket        | Model                                          | Limit Generate | Estimasi Biaya Max | Harga Jual |
| ------------ | ---------------------------------------------- | -------------- | ------------------ | ---------- |
| **Gratis**   | `@cf/qwen/qwen1.5-1.8b-chat`                   | 2x             | Rp 0               | Rp 0       |
| **Medium**   | `@cf/meta/llama-3.2-3b-instruct`               | 15x            | \~Rp 7.000         | Rp 24.000  |
| **Advanced** | `@cf/mistral/mistral-7b-instruct-v0.2-lora`    | 35x            | \~Rp 18.000        | Rp 38.000  |
| **Expert**   | `@cf/deepseek-ai/deepseek-r1-distill-qwen-32b` | 50x            | \~Rp 23.000        | Rp 69.000  |

>Catatan: Estimasi biaya dihitung berdasarkan rata-rata 4.500 neuron per generate (setara ~Rp 450), dikali limit paket.