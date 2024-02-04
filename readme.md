# Electro AI

## Overview

Electro AI is a completely free, standalone, open-source desktop AI tool that offers advanced features such as Retrieval Augmented Generation (RAG) and the ability to retrieve internet search results. The tool leverages the power of the Open Source Language Model (LLM) and integrates embeddings obtained through DuckDuckGo scraping. This README document provides a comprehensive overview of the project, detailed installation instructions, usage guidelines, and information on how to contribute to the ongoing development of the tool.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

🤖 - Execute Language Models (LLMs) on your laptop or PC, entirely offline and Free
👾 - Utilize models via the in-app Chat UI or connect to a local server compatible with OpenAI
🔍 - Retrieve internet search results with the integrated search feature
💬 - Access Retrieval Augmented Generation (RAG) or document chat functionalities

## Installation

1. Clone the Electro AI repository:

    ```bash
    git clone https://github.com/amitjhariya/ElectroAi.git
    cd ElectroAi
    ```

2. Install Server dependencies:

    ```bash
    npm install
    ```
3. Start Electon App:

    ```bash
    npm run electron-start
    ```

4. Create Desktop App :

    ```bash
    npm run electron-start
    ```

## Usage

Electro AI is designed to be user-friendly. Follow these steps to make the most of its features:

Electro Ai is compatible with various models hosted on Hugging Face, including GGUF Llama, MPT, and StarCoder models such as Llama 2, Orca, Vicuna, Nous Hermes, WizardCoder, and more.

To run Electro Ai, a minimum requirement is an M1/M2/M3 Mac or a Windows PC with a processor supporting AVX2. Linux support is available in beta.

This capability is achieved through the integration of the llama.cpp & lanchain project.

Download Quantized models from  HuggingFace 🤗 repositories (TheBloke recommanded).

Upload Dcoumennts like pdf, text, json or csv

## Contributing

We welcome contributions to make Electro AI even more powerful and versatile. To contribute:

1. Fork the repository.

2. Create a new branch:

    ```bash
    git checkout -b feature/your-feature
    ```

3. Commit your changes:

    ```bash
    git commit -m "Add your feature"
    ```

4. Push to the branch:

    ```bash
    git push origin feature/your-feature
    ```

5. Open a pull request.

## License

Electro AI is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to reach out if you have any questions or need assistance with Electro AI. Happy coding!