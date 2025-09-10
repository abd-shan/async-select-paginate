module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-class-properties',   // ✅ استبدل proposal بـ transform
        '@babel/plugin-transform-private-methods',
        '@babel/plugin-transform-private-property-in-object',
    ],
};
