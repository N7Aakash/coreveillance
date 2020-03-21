// local imgs
const Onboarding = require("../assets/imgs/he3.jpg");
const Logo = require("../assets/imgs/argon-logo.png");
const coreLogo= require("../assets/imgs/3.png");
const LogoOnboarding = require("../assets/imgs/3.png");
const ProfileBackground = require("../assets/imgs/pr.jpg");
const RegisterBackground = require("../assets/imgs/register-bg.png");
const Pro = require("../assets/imgs/getPro-bg.png")
const getStarted = require("../assets/imgs/get-started.png");
const ArgonLogo = require("../assets/imgs/argonlogo.png");
const iOSLogo = require("../assets/imgs/ios.png");
const androidLogo = require("../assets/imgs/android.png");
const login = require("../assets/imgs/login.jpg");
const register = require("../assets/imgs/register.png");
const create = require("../assets/imgs/12_-_user_add_plus_contact_account_new_create-512.png");
const google = require("../assets/imgs/google.jpg");
const github = require("../assets/imgs/github-octocat.png");
const logoData= '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';
// internet imgs

const ProfilePicture = 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?fit=crop&w=1650&q=80';

const Viewed = [
  'https://images.unsplash.com/photo-1501601983405-7c7cabaa1581?fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1543747579-795b9c2c3ada?fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1551798507-629020c81463?fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1503642551022-c011aafb3c88?fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?fit=crop&w=240&q=80',
];

const Products = {
  'View article': 'https://images.unsplash.com/photo-1501601983405-7c7cabaa1581?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=840&q=840',
};

export default {
  Onboarding,
  Logo,
  LogoOnboarding,
  ProfileBackground,
  ProfilePicture,
  RegisterBackground,
  Viewed,
  Products,
  Pro,
  ArgonLogo,
  iOSLogo,
  androidLogo,
  coreLogo,
  login,
  register,
  create,
  google,
  github,
  logoData
};