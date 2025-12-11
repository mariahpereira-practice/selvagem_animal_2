import { NextResponse } from "next/server";
import { verifySession } from "@/lib/session";

function validateAdocaoData(data) {
    const errors = [];

    if (!data.nome || typeof data.nome !== 'string') {
        errors.push('Nome é obrigatório');
    } else if (data.nome.trim().length < 3) {
        errors.push('Nome deve ter no mínimo 3 caracteres');
    }

    if (!data.email || typeof data.email !== 'string') {
        errors.push('E-mail é obrigatório');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('E-mail inválido');
    }

    if (!data.animal || typeof data.animal !== 'string') {
        errors.push('Animal é obrigatório');
    }

    if (!data.mensagem || typeof data.mensagem !== 'string') {
        errors.push('Mensagem é obrigatória');
    } else if (data.mensagem.trim().length < 10) {
        errors.push('Mensagem deve ter no mínimo 10 caracteres');
    }

    return errors;
}

export async function POST(request) {
    try {
        const user = await verifySession();
        if (!user) {
            return NextResponse.json(
                { error: 'Não autorizado' },
                { status: 401 }
            );
        }

        const data = await request.json();

        const validationErrors = validateAdocaoData(data);
        if (validationErrors.length > 0) {
            return NextResponse.json(
                { error: validationErrors.join(', ') },
                { status: 400 }
            );
        }

        console.log('Dados de adoção validados:', {
            ...data,
            userId: user.uid,
            createdAt: new Date().toISOString()
        });

        return NextResponse.json({
            success: true,
            message: 'Solicitação de adoção recebida com sucesso!'
        });

    } catch (error) {
        console.error('Erro ao processar adoção:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}
