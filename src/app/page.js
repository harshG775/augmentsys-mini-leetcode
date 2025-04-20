export default function HomePage() {
    return (
        <main className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Mini LeetCode Clone</h1>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Submit a Problem</h2>
                {/* <ProblemForm
                    onSuccess={() => {
                    }}
                /> */}
            </section>
            <section>
                <h2 className="text-2xl font-semibold mb-4">Problems</h2>
                {/* <ProblemList /> */}
            </section>
        </main>
    );
}