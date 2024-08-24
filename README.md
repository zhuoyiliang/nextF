<<<<<<< HEAD
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

git remote add nextF url
git fetch nextF
git branch -a
git checkout main
git push nextF main

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## 组件定义
1. 简单的函数组件
```tsx
import React from 'react';

const Page = () => {
  return (
    <div>
      <h1>Hello, Next.js!</h1>
    </div>
  );
};

export default Page;

```
2.使用 TypeScript 类型
```tsx
import React, { FC } from 'react';

const Page: FC = () => {
  return (
    <div>
      <h1>Hello, Next.js with TypeScript!</h1>
    </div>
  );
};

export default Page;

```

3.使用 getStaticProps（静态生成）
```tsx
import React from 'react';

export const getStaticProps = async () => {
  return {
    props: {
      message: 'Hello from getStaticProps',
    },
  };
};

const Page = ({ message }: { message: string }) => {
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default Page;

```
4. 使用 getServerSideProps（服务端渲染）
```tsx
import React from 'react';

export const getServerSideProps = async () => {
  return {
    props: {
      message: 'Hello from getServerSideProps',
    },
  };
};

const Page = ({ message }: { message: string }) => {
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default Page;

```
5. 使用 getStaticPaths 和 getStaticProps（动态路由静态生成）
```tsx
import React from 'react';

export const getStaticPaths = async () => {
  const paths = [{ params: { id: '1' } }, { params: { id: '2' } }];
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  return {
    props: {
      id: params.id,
    },
  };
};

const Page = ({ id }: { id: string }) => {
  return (
    <div>
      <h1>Post ID: {id}</h1>
    </div>
  );
};

export default Page;

```

6. 使用 React Hooks
```tsx
import React, { useState } from 'react';

const Page = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
};

export default Page;

```

7. 组合 getStaticProps 和 Hooks
```tsx
import React, { useState } from 'react';

export const getStaticProps = async () => {
  return {
    props: {
      initialCount: 10,
    },
  };
};

const Page = ({ initialCount }: { initialCount: number }) => {
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
};

export default Page;

```
8. 动态导入组件
```tsx
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/MyComponent'), { ssr: false });

const Page = () => {
  return (
    <div>
      <h1>Hello, Next.js with Dynamic Import!</h1>
      <DynamicComponent />
    </div>
  );
};

export default Page;

```

9. 使用 useEffect 和 useState
```tsx
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      <h1>Data: {data ? JSON.stringify(data) : 'Loading...'}</h1>
    </div>
  );
};

export default Page;

```

10. 使用 Error Boundaries
```tsx
import React from 'react';

class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError(error: any) {
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.error('Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}

const Page = () => {
    return (
        <ErrorBoundary>
            <div>
                <h1>Hello, Next.js with Error Boundary!</h1>
            </div>
        </ErrorBoundary>
    );
};

export default Page;

```
=======
# nextF
nextjs 前端
>>>>>>> main
