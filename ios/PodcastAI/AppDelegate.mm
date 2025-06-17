#import <React/RCTBundleURLProvider.h>
#import <React/RCTLinkingManager.h>
#import <React/RCTRootView.h>
#import <Expo/Expo.h>
#import <ReactAppDependencyProvider/ReactAppDependencyProvider.h>

@interface AppDelegate ()

@property (nonatomic, strong) UIWindow *window;
@property (nonatomic, strong) ExpoReactNativeFactory *reactNativeFactory;
@property (nonatomic, strong) ReactNativeDelegate *reactNativeDelegate;

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  ReactNativeDelegate *delegate = [[ReactNativeDelegate alloc] init];
  ExpoReactNativeFactory *factory = [[ExpoReactNativeFactory alloc] initWithDelegate:delegate];
  delegate.dependencyProvider = [RCTAppDependencyProvider new];

  self.reactNativeFactory = factory;
  self.reactNativeDelegate = delegate;

  [self bindReactNativeFactory:factory];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  [factory startReactNativeWithModuleName:@"main"
                           reactDelegate:delegate
                                 inWindow:self.window
                           launchOptions:launchOptions];

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

// URL scheme handling
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  return [RCTLinkingManager application:app openURL:url options:options] || [super application:app openURL:url options:options];
}

// Universal links
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *))restorationHandler {
  return [RCTLinkingManager application:application continueUserActivity:userActivity restorationHandler:restorationHandler] || [super application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
}

@end
