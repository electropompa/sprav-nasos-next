import { Suspense } from 'react';
import { getTestRows } from './lib/db';

async function TestList() {
    const rows = await getTestRows();

    return (
        <ul>
            {rows.map((row) => (
                <li key={row.id}>{row.slug} : {row.name}</li>
            ))}
        </ul>
    );
}

export default function Home() {
    return (
        <main>
            <h1>Тест базы данных</h1>
            <Suspense fallback={<p>Загрузка…</p>}>
                <TestList />
            </Suspense>
        </main>
    );
}