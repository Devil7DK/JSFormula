import { fusebox, sparky } from 'fuse-box';

class Context {
    runServer;
    getConfig = () =>
        fusebox({
            target: 'browser',
            entry: 'demo/index.tsx',
            webIndex: {
                publicPath: './',
                template: 'demo/index.html',
            },
            cache: true,
            devServer: this.runServer,
        });
}

const { task } = sparky<Context>(Context);

task('default', async (ctx) => {
    ctx.runServer = true;
    const fuse = ctx.getConfig();
    await fuse.runDev();
});

task('preview', async (ctx) => {
    ctx.runServer = true;
    const fuse = ctx.getConfig();
    await fuse.runProd();
});

task('dist', async (ctx) => {
    ctx.runServer = false;
    const fuse = ctx.getConfig();
    await fuse.runProd();
});
