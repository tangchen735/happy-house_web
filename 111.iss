; Fixed script: resolve path/permission/shortcut issues (all English version)
#define MyAppName "HappyHouse"
#define MyAppVersion "1.0"
#define MyAppPublisher "tangchen"
#define MyAppExeName "app.bat"

[Setup]
AppId={{7FF0F643-E29E-42A3-A856-D67DB60C47B3}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
DefaultDirName={userdocs}\{#MyAppName}
PrivilegesRequired=lowest
DisableProgramGroupPage=yes
OutputBaseFilename=HappyHouse_Setup
SolidCompression=yes
WizardStyle=modern dynamic

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: checkablealone

[Files]
Source: "C:\Users\a7712\Desktop\happy-house\{#MyAppExeName}"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\Users\a7712\Desktop\happy-house\node.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\Users\a7712\Desktop\happy-house\core\*"; DestDir: "{app}\core"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "C:\Users\a7712\Desktop\happy-house\public\*"; DestDir: "{app}\public"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: shellexec postinstall skipifsilent