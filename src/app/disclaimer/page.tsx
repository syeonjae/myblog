export default function DisclaimerPage() {
  return (
    <main className="mx-auto w-full max-w-3xl py-8">
      <h1 className="text-3xl font-bold">Disclaimer</h1>
      <div className="mt-6 space-y-4 text-zinc-300 leading-8">
        <p>
          이 블로그의 내용은 정보 제공 목적이며, 법률·세무·의료·투자 자문이 아닙니다.
        </p>
        <p>
          게시된 정보를 기반으로 한 의사결정과 결과에 대한 책임은 사용자 본인에게
          있습니다.
        </p>
        <p>
          외부 링크와 서드파티 서비스의 내용/정책에 대해 운영자는 책임지지 않습니다.
        </p>
      </div>
    </main>
  );
}
