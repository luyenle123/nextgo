

// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';

// export default NextAuth({
//   // Configure one or more authentication providers
//   providers: [
//     GoogleProvider({
//       clientId: '1035671539361-u6iam788ar009ittevj5g2nn13prs1q2.apps.googleusercontent.com',//process.env.GOOGLE_CLIENT_ID,
//       clientSecret: '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',//process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   pages: {
//     signIn: '/auth/signin',  // Customize sign-in page (optional)
//   },
//   callbacks: {
//     async signIn({ account, profile }) {
//       // if (account.provider === 'google') {
//       //   return profile.email_verified && profile.email.endsWith('@gmail.com'); // Example condition
//       // }
//       return true; // Sign in allowed
//     },
//     async jwt({ token, account }) {
//       if (account) {
//         token.accessToken = account.access_token;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       //session.accessToken = token.accessToken;
//       return session;
//     },
//   },
// });