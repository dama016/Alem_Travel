import { useState } from 'react';
import { Switch } from './ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Globe, User, Menu, X, Plane, Map, Languages as LanguagesIcon, Calendar, LogOut, Moon, Sun, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  activeSection: 'home' | 'planner' | 'translator' | 'maps' | 'mytrips' | 'feedbacks';
  onNavigate: (section: 'home' | 'planner' | 'translator' | 'maps' | 'mytrips' | 'feedbacks') => void;
  onOpenAuth: () => void;
  onOpenContact: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const appleFont: React.CSSProperties = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif",
  letterSpacing: '-0.02em',
  fontWeight: 600,
};

const LOGO_SRC = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iMTAyNC4wMDAwMDBwdCIgaGVpZ2h0PSIxMDI0LjAwMDAwMHB0IiB2aWV3Qm94PSIwIDAgMTAyNC4wMDAwMDAgMTAyNC4wMDAwMDAiCiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0Ij4KCjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLDEwMjQuMDAwMDAwKSBzY2FsZSgwLjEwMDAwMCwtMC4xMDAwMDApIgpmaWxsPSIjMDAwMDAwIiBzdHJva2U9Im5vbmUiPgo8cGF0aCBkPSJNNTAxNSA3NDYzIGMtMTg0IC04IC01NjIgLTczIC02MjUgLTEwOCAtMTQgLTcgLTU0IC0yMyAtOTAgLTM1IC0zNgotMTIgLTkzIC0zNSAtMTI4IC01MSAtNjYgLTMwIC04NyAtMzYgLTc3IC0xOSAzIDYgLTEgNyAtOSA0IC05IC0zIC0xMyAtMTEgLTkKLTE3IDQgLTcgMCAtOCAtMTEgLTQgLTE3IDcgLTM2IC0yIC0xNjYgLTc5IC0zODggLTIyOCAtNzQwIC02MTUgLTkzNSAtMTAyNwotMTU3IC0zMzMgLTIyNSAtNjM2IC0yMjUgLTEwMDcgMCAtMjE0IDE4IC0zNjQgNjYgLTU2MCA1NyAtMjMwIDEyOSAtNDA4IDI0MgotNTk4IDUxIC04NyA1NyAtOTMgODEgLTg3IDExMiAyNyAxMTQgMjggODIgNzMgLTY5IDk5IC0xNjYgMzA3IC0yMjcgNDg2IC01NgoxNjQgLTExMSA0NDYgLTEwMiA1MjYgbDMgMzUgMjMgLTQyIGMxMiAtMjMgMjIgLTQ4IDIyIC01NCAwIC03IDEwIC0zMyAyMSAtNTcKMTcgLTM0IDMyIC00OSA2NSAtNjQgNDMgLTE5IDQ0IC0yMCA0NCAtNjggMCAtMjcgLTcgLTY4IC0xNiAtOTAgLTEyIC0zMCAtMTUKLTYyIC0xMiAtMTI2IDQgLTc5IDggLTkyIDYyIC0yMDEgNDggLTk1IDcxIC0xMjkgMTI4IC0xODYgNjkgLTcwIDk1IC0xMDkgMTE3Ci0xNzkgNyAtMjEgMTkgLTM4IDI2IC0zOCAyMSAwIDI0MyA1OCAzMDAgNzkgMjggOSA2MSAyNiA3MyAzNyAxMiAxMCAyOCAxOSAzNQoxOSAzMSAyIDk1IDI3IDEwMCAzOSA0IDkgMTQgMTIgMjUgOSAxNSAtMyAyMSAyIDI2IDI0IDQgMTUgMTkgNTcgMzMgOTIgMTUgMzYKMjYgODUgMjYgMTEwIDAgNDIgLTQgNDkgLTUzIDkzIC0zMCAyNiAtNzggNTcgLTEwNyA2OCAtNzUgMjggLTE0NyA2NSAtMTYzIDg1Ci03IDkgLTI3IDQ0IC00NCA3NyAtMjUgNTAgLTM5IDY2IC03NiA4NSAtMjUgMTIgLTcwIDUwIC0xMDAgODMgLTQ3IDUwIC03MCA2NgotMTQwIDk1IC0xMDEgNDIgLTEzOCA0NCAtMTc4IDEwIC02MSAtNTEgLTkyIC0yNiAtOTIgNzUgMCA1NiAtMyA2NCAtMzEgOTAKLTMwIDI3IC0zMSAzMiAtMjcgODEgOSA4OCAtMTggMTE5IC03MSA4MiBsLTI0IC0xNiA3IDc0IGM5IDkyIDMxIDEzOSA3MyAxNTYKMjcgMTEgMzQgMTAgNDcgLTMgOSAtOCAxNiAtMjcgMTYgLTQwIDAgLTE0IDcgLTQwIDE0IC01OSAxMiAtMjcgMjEgLTM1IDQwCi0zNSAzMyAwIDQ2IDI2IDQ2IDg4IDAgODEgMTAgMTEwIDU2IDE2MSAyNCAyNyA1OCA3NyA3NSAxMTIgMjAgNDAgNTggODkgMTAzCjEzNSA2MyA2MyA3NyA3MiAxMDggNzIgNTEgMCAxMDcgMjkgMTE0IDU5IDUgMTkgMCAzMSAtMjAgNDkgLTE4IDE3IC0yNiAzNQotMjYgNTggMCAzNiAxMyA0NiA1NSA0NiAyMyAwIDI0IC0xIDEwIC0zMyAtMjAgLTQ5IDEgLTY5IDg4IC04MiA3NiAtMTIgOTUgMjAKNjEgMTA0IC0xMiAzMSAtMTMgNDcgLTUgNzYgOSAzMiA2IDQ2IC0xNCA5NiAtMTYgMzcgLTI1IDc4IC0yNSAxMTIgMCAzMCAtNgo2MiAtMTQgNzMgLTEzIDE3IC0xOCAxOCAtNDUgNyAtMjkgLTExIC0zMSAtMTAgLTMxIDEyIDAgNTkgLTUyIDEwNSAtMTAwIDkwCi0yNyAtOSAtNjUgLTY2IC04OSAtMTM4IC0xMiAtMzMgLTM0IC03NCAtNTEgLTkzIC0xNiAtMTkgLTMwIC00MCAtMzEgLTQ3IDAKLTcgLTYgLTEgLTEyIDEzIC03IDE0IC0yMCAzNyAtMzEgNTMgLTEzIDE5IC0xNyAzNyAtMTIgNTggMTAgNTAgMTY0IDIzOCAyNzUKMzMzIDUyIDQ2IDY3IDU0IDgyIDQ1IDMwIC0xNiAyMiAtMzUgLTM2IC04NSAtMzAgLTI2IC01NSAtNTYgLTU1IC02NiAwIC0yOAo5NCAtMTE4IDEyMyAtMTE4IDMzIDAgNzUgNDQgNzkgODMgMiAyNCA4IDMxIDI3IDMyIDEzIDEgMzUgMTUgNDkgMzAgMTkgMjIgMjIKMzUgMTcgNTkgLTMgMTcgLTkgNTkgLTEzIDkzIC01IDQzIC0xNCA2OSAtMzAgODYgLTEyIDEzIC0yMiAyNyAtMjIgMzMgMSA3CjE0NiAxMTIgMTcxIDEyMiA0IDIgOSAtOSAxMSAtMjUgMiAtMjMgMTAgLTMwIDQxIC0zNyAyMCAtNSAzNyAtMTMgMzcgLTE4IDAKLTQgLTkgLTMxIC0yMCAtNjAgLTExIC0yOSAtMjAgLTY3IC0yMCAtODQgMCAtMTkgLTggLTM4IC0yMSAtNTAgLTQxIC0zNyAtNjIKLTk0IC02NyAtMTg2IGwtNSAtODcgMzYgLTM2IGM2MSAtNjEgMTAyIC00MyAxNjcgNzAgMTggMzEgNDEgNjIgNTMgNjggMTEgNwo0OCAzMSA4MyA1MyAzNCAyMyA5MiA1MyAxMjkgNjggMTAwIDQwIDE0MCA2OSAxNTggMTE1IDkgMjIgMzcgNjggNjIgMTAyIDI1CjM0IDQ1IDY3IDQ1IDczIDAgNyAxMiAzNiAyNiA2NCAyMCA0MCAzOSA2MSA4MCA4NyA3NiA0OSA3MSA5NSAtOCA5NSAtMjMgMAotNTAgOCAtNjYgMjAgLTE1IDExIC00NiAyMCAtNjkgMjIgLTIzIDEgLTQwIDUgLTM4IDkgNyAxMCAyMDAgNDggMzM1IDY0IDQzMwo1MiA5MjggLTUyIDEzMTEgLTI3NiA3MyAtNDIgNzMgLTQzIDQ3IC01MyAtNjQgLTI3IC05NyAtOTkgLTYyIC0xMzcgMTEgLTEyCjEzIC0xOSA1IC0xOSAtNyAwIC0yMiAxMSAtMzUgMjUgLTEzIDE0IC0yNiAyNSAtMzAgMjUgLTMgMCAtMTUgLTE1IC0yNiAtMzIKbC0yMCAtMzMgMCAyNiBjMCAzMCAtMjggNDggLTQyIDI3IC02IC0xMCAtMTAgLTEwIC0xNyAxIC01IDcgLTE0IDEwIC0yMCA3Ci0xNSAtMTAgLTE0IC04OSAxIC0xMDQgMTYgLTE2IC02IC0zMiAtNDIgLTMxIC0yMyAxIC0yMiAyIDUgOCBsMzAgNyAtMzAgNgpjLTI0IDYgLTM0IDIgLTUwIC0xNyAtMTQgLTE3IC0zMiAtMjUgLTU1IC0yNiBsLTM1IC0yIDQwIC03IGMyNyAtNSAzMiAtOCAxNQotOSAtMTQgLTEgLTUyIC0xMyAtODUgLTI2IC0zMyAtMTQgLTY0IC0yNSAtNjggLTI1IC01IDAgLTIyIC05IC0zOCAtMjEgLTE2Ci0xMSAtMjkgLTE3IC0yOSAtMTQgMCAxMSAyOCAzNSA1MiA0NCAxNiA3IDE4IDEwIDYgMTAgLTIyIDEgLTgwIC00OCAtNzEgLTYxCjMgLTYgMSAtOCAtNSAtNCAtNiAzIC0xMyAyIC0xNyAtNCAtMyAtNSAtMSAtMTAgNSAtMTAgNiAwIDggLTUgNCAtMTEgLTUgLTgKLTggLTggLTE0IDAgLTUgOSAtMTAgOCAtMjAgLTQgLTE2IC0xOSAtNDQgLTE5IC02MCAwIC0xMSAxMyAtOCAxNSAxNyAxNSA2OCAwCjk1IDU5IDQ4IDEwNSAtMjggMjkgLTQ3IDMzIC0zOCA4IDUgLTE0IDQgLTE2IC04IC04IC04IDYgLTQwIDE5IC03MSAzMCAtNTUKMTcgLTgzIDQzIC0zNSAzMSAxMiAtMyAwIDUgLTI4IDE5IC0zMSAxNSAtNjUgMjQgLTkwIDIzIC0zMiAtMSAtMzQgLTIgLTEwIC01CjUyIC02IDc1IC0xMyA3NSAtMjIgMCAtNSAtMTUgLTYgLTMzIC0xIC0xOCA0IC00OCA1IC02NyAyIC0yMyAtMyAtMzEgLTEgLTI2CjcgMTMgMjAgLTE3IDExIC03MiAtMjEgLTM2IC0yMyAtNzIgLTU3IC0xMTAgLTEwOCAtNjQgLTg2IC02MSAtODIgLTEyNSAtMTM0Ci01NyAtNDYgLTcwIC03NCAtNjEgLTEzMyA4IC01NyAyOCAtNzcgNjggLTY5IDY4IDEzIDY3IDEzIDg0IC0zMyAyMSAtNTQgNDEKLTY5IDc5IC01NSAzOCAxMyA4NyAxMTQgODAgMTY0IC0zIDE5IC04IDQyIC0xMSA1MCAtNCAxMCA4IDM2IDMxIDY3IDIxIDI4IDQzCjU5IDQ5IDcwIDcgMTAgMTUgMTUgMTkgMTEgNCAtNCAtNyAtMjkgLTI1IC01NSAtMjYgLTQwIC0zMSAtNTUgLTI2IC04OCA3IC01NwoyNiAtNjcgMTE2IC02MCA1NiA0IDcxIDMgNTggLTUgLTEwIC02IC0yNCAtMTAgLTMwIC05IC03IDEgLTI0IDEgLTM4IDAgLTIxCi0xIC0yMiAtMyAtMTAgLTEyIDEyIC04IDkgLTkgLTEyIC01IC0yMiA1IC0yOCAxIC0zOCAtMjIgLTE3IC00MSAtNDggLTk0IC02MwotMTA5IC04IC04IC0zNiAtMTggLTYzIC0yMiBsLTQ5IC05IDQwIC0yIGMzMiAtMSAzNiAtMyAyMCAtMTAgLTI4IC0xMiAtMTAzCi0xMiAtMTEwIDAgLTMgNiAyIDEwIDEyIDEwIDE1IDAgMTYgMiAzIDEwIC04IDUgLTI0IDI4IC0zNSA1MiAtMTEgMjMgLTI3IDQ0Ci0zNSA0NiAtMzEgNiAtNTIgLTIzIC01OCAtNzYgLTQgLTQxIC05IC01MyAtMjYgLTU4IC0xMSAtMyAtNDQgLTMxIC03MyAtNjIKLTQ1IC00NyAtNjQgLTU5IC0xMzAgLTgxIC02OSAtMjMgLTc4IC0yOSAtODEgLTUzIC0yIC0yMCA0IC0zMSAyMyAtNDQgMzQgLTIyCjUwIC02MSAzMyAtODEgLTkgLTExIC0yNyAtMTMgLTgyIC04IC05OCA5IC0xMDUgMiAtMTE4IC0xMTAgLTUgLTQ4IC03IC05OSAtNAotMTExIDkgLTM0IDYxIC01NyAxMjkgLTU3IDQ5IDAgNjMgNCA5NSAzMCAyMCAxNiA0NSA0NCA1NCA2MyAyMSA0MiA4NSAxMDgKMTEyIDExNiAxMiAzIDM2IDEzIDU0IDIxIGwzMiAxNSA1MyAtNDkgYzI4IC0yNyA2NCAtNTcgODAgLTY3IDM0IC0yMyAzNSAtNDIKMiAtNTAgLTQ0IC0xMSAtMjQgLTU2IDI1IC01NiAyNyAwIDUyIDI2IDgzIDg2IGwxNiAzMSAtNzAgNjkgYy0zOCAzNyAtNjkgNzQKLTY5IDgyIDAgMTkgMTMzIC05NiAxNDYgLTEyNyA3IC0xNCAyMCAtNDUgMjkgLTY4IDEwIC0yMyAyNiAtNTAgMzYgLTU5IDE3Ci0xNSAyMSAtMTQgNTYgMTMgNTYgNDUgMTkxIDExMyAyMjEgMTEzIDI3IDAgMjA1IC00MSAzNjcgLTg0IDUwIC0xMyAxMjIgLTMwCjE2MCAtMzYgMzkgLTcgOTAgLTE5IDExNCAtMjYgMjUgLTggNTIgLTE0IDYxIC0xNCA5IDAgNzcgNDUgMTUxIDEwMCAxNDUgMTA4CjIyMSAxNTAgMzE1IDE3NCAxNTYgNDAgMjM4IDUgMjQ4IC0xMDggNCAtNDMgMCAtNTcgLTM0IC0xMTcgLTIyIC0zNyAtNDAgLTc2Ci00MCAtODYgLTEgLTM3IC0xMzQgLTE2MyAtMTczIC0xNjMgLTEzIDAgLTM4IC0xNCAtNTcgLTMxIC0xOSAtMTcgLTI5IC0yOAotMjIgLTI0IDMwIDE1IDggLTE2IC00MSAtNTcgLTg4IC03NiAtOTggLTE2MSAtNDIgLTM1NiA0MCAtMTQxIDU3IC0xNzggODUKLTE4NyA0OSAtMTYgODIgMzQgMTA0IDE1OCAxMSA2MyAyMCA4MyA3NSAxNTkgMzUgNDggNjcgODYgNzEgODMgNCAtMiAxMyAtMjYKMjAgLTUyIDE5IC03MSAzNyAtMTAxIDYyIC0xMDUgMjIgLTMgMjMgLTkgMjkgLTExNCA0IC02MSAxMiAtMTIxIDE4IC0xMzIgMTgKLTM0IDE0IC00MyAtMTMgLTMwIC0zMiAxNCAtNTYgNCAtNTYgLTIyIDAgLTI2IDc0IC0yMjQgOTYgLTI1NyAyMCAtMzIgNzMgLTYzCjEwNyAtNjMgMzQgMCAzNCAtMTMgMSAtODcgLTI0IC01NCAtMjcgLTU3IC0zNyAtMzUgLTMxIDY3IC0xNDEgMTYgLTIzMiAtMTA3Ci0xOSAtMjcgLTY4IC03MiAtMTA5IC0xMDAgLTQxIC0yOCAtODQgLTYyIC05NCAtNzYgLTExIC0xMyAtMzIgLTY0IC00NyAtMTEyCi0xNCAtNDkgLTM4IC0xMTQgLTUyIC0xNDYgLTI1IC01NSAtMjUgLTU4IC04IC03NyAxMCAtMTEgMjQgLTIwIDMxIC0yMCA4IDAKNTcgMjMgMTEwIDUwIDkwIDQ4IDk1IDQ5IDc2IDIzIC0xMDMgLTE0NSAtMzk0IC0zODkgLTYxNyAtNTE4IC0zMjggLTE5MCAtNzE4Ci0yOTUgLTExMDAgLTI5NSAtMzMxIDAgLTY2MSA3NyAtOTYwIDIyNCAtMTgyIDkwIC0yNDIgMTI4IC0yNTUgMTYxIC01IDEzIC0zMQo1NSAtNTggOTIgLTc1IDEwMyAtNzcgMTEwIC01NiAxNDggMTEgMjAgMTUgNDEgMTAgNTggbC02IDI2IC03OCAtNDAgYy01NiAtMjgKLTk3IC00MSAtMTUzIC00OCAtODIgLTExIC0xMjkgLTI1IC0xMjkgLTQwIDAgLTUgMzggLTQ0IDg1IC04NiA0NTUgLTQxNSA5OTQKLTYyNSAxNjAwIC02MjUgNTQ3IDAgMTA0NiAxNzUgMTQ4MCA1MTggOTggNzggMjczIDI1MCAzNjMgMzU3IDQ1OSA1NDcgNjQ0CjEzMjUgNDgxIDIwMjggbC0yMSA4OCAtOTEgLTkwIGMtNTEgLTQ5IC0xMTIgLTEwNSAtMTM3IC0xMjUgLTI1IC0yMCAtNTQgLTQ0Ci02NSAtNTQgLTExIC0xMCAtMzMgLTI0IC00OCAtMzAgLTE1IC03IC0yNSAtMTcgLTIyIC0yMiAzIC02IDAgLTEwIC05IC0xMCAtOAowIC00MCAtMjUgLTcxIC01NSAtMzEgLTMwIC02NSAtNTUgLTc2IC01NSAtMjMgMCAtMTI5IC03OSAtMTI5IC05NiAwIC0xMwotMTAzIC0xMDQgLTExOCAtMTA0IC0xMyAwIC0yMiAyNSAtMjIgNTkgMCAyMiA5IDM0IDQwIDU1IDIyIDE1IDEwNyA4MCAxODgKMTQ1IDQzNyAzNTIgNzM5IDY1NiA5MDUgOTEyIDcxIDExMCAxMTggMjA0IDE1MyAzMDkgMjUgNzQgMjggMTAxIDI5IDIwOCAwCjEwNyAtMiAxMjUgLTE3IDEzMyAtMTAgNiAtMTggMTYgLTE4IDI0IDAgOCAtOSAxOSAtMTkgMjUgLTExIDUgLTIzIDIwIC0yNiAzMQotNiAxNyAtOSAxOSAtMTYgOCAtNiAtMTAgLTkgLTExIC05IC0xIDAgNiAtNyAxMiAtMTUgMTIgLTggMCAtMTUgNCAtMTUgMTAgMAoxNSAtNTkgNzIgLTY5IDY2IC00IC0zIC0xOSA1IC0zMiAxNyAtMTMgMTIgLTI4IDIxIC0zMiAxOSAtNSAtMSAtMTUgMyAtMjMgOQotOCA2IC0xNCA4IC0xNCA0IDAgLTQgLTcgLTIgLTE1IDUgLTggNiAtMTkgOSAtMjUgNSAtNiAtMyAtMzggMTIgLTcxIDM0IC05Ngo2NCAtMTcxIDg0IC0zMTkgODQgLTE1NCAtMSAtMzczIC0zNiAtNTUwIC05MCAtNDcgLTE0IC0xMDMgLTI1IC0xMjQgLTI0IGwtMzkKMSA4OCAtNjggYzE3OCAtMTM2IDE1NyAtMTI0IDE5NSAtMTA4IDE5IDcgMTA2IDI4IDE5MyA0NiAxNDMgMjkgMTcyIDMyIDI4NQoyOCAxNDAgLTUgMjI4IC0zMCAyOTggLTgzIDYyIC00NyA3NiAtNzkgNzEgLTE2MiAtMiAtNDAgLTMgLTczIC0xIC03MyAyIDAgOAoxNSAxMyAzMyA5IDI4IDEwIDI0IDYgLTI1IC0xMCAtMTMxIC0xNjcgLTM1NCAtNDU4IC02NTMgLTEyNyAtMTMwIC0xNTggLTE1NwotMTY3IC0xNDUgLTUgOCAtMTAgMTAgLTEwIDQgMCAtMTEgLTc4IC0yOSAtODcgLTIxIC0xMCAxMCA2OCAxMTAgMTY0IDIxMCA1Nwo1OSAxMDMgMTEyIDEwMyAxMTcgMCAxOSAtNTIgMTE0IC0xMTAgMjAwIC0xNjYgMjQ3IC0zOTkgNDc2IC02NjUgNjU0IC00MCAyNwotNzIgNDIgLTg0IDM5IC0xMCAtMiAtNDcgMTAgLTgxIDI5IC0xNjAgODQgLTIwNiAxMDUgLTM2MCAxNjAgLTI4MiAxMDAgLTU4NAoxNDUgLTg4NSAxMzF6IG0tMzYwIC0yMDIgYzUgLTEwIC0xNTQgLTUgLTE2MyA0IC0zIDMgMzEgNSA3NiA1IDQ0IDAgODMgLTQgODcKLTl6IG0tMTkwIC0xMSBjLTExIC01IC0zOCAtOCAtNjAgLTggbC00MCAxIDQwIDcgYzIyIDQgNDkgNyA2MCA4IGwyMCAxIC0yMAotOXogbTIzOCAtMjcgYy03IC0yIC0xOSAtMiAtMjUgMCAtNyAzIC0yIDUgMTIgNSAxNCAwIDE5IC0yIDEzIC01eiBtMTY0NQotMjEwIGMtMTAgLTIgLTI2IC0yIC0zNSAwIC0xMCAzIC0yIDUgMTcgNSAxOSAwIDI3IC0yIDE4IC01eiBtMTMyOSAtMzUgYy0zCi04IC02IC01IC02IDYgLTEgMTEgMiAxNyA1IDEzIDMgLTMgNCAtMTIgMSAtMTl6IG0xMCAtMTAwIGMtMiAtMTggLTQgLTYgLTQKMjcgMCAzMyAyIDQ4IDQgMzMgMiAtMTUgMiAtNDIgMCAtNjB6IG0tMzkyNyAxMiBjMTggLTEyIDIgLTEyIC0yNSAwIC0xMyA2Ci0xNSA5IC01IDkgOCAwIDIyIC00IDMwIC05eiBtMjMxNCAtOTI4IGMzIC01IC02IC0xOSAtMTkgLTMwIC0zMSAtMjcgLTMyIC01MgotMiAtODkgMzQgLTQxIDY3IC05OCA3NyAtMTMzIDcgLTI2IDYgLTMwIC0xMCAtMzAgLTQ0IDAgLTY3IDE4IC03NSA1NyAtMyAyMQotMjAgNjEgLTM2IDg5IC0zNSA2MyAtMzggMTA3IC03IDEyOCAyNCAxNyA2NCAyMSA3MiA4eiBtLTM1MCAtMTcgYy00IC04IC0xMQotMTUgLTE2IC0xNSAtNiAwIC01IDYgMiAxNSA3IDggMTQgMTUgMTYgMTUgMiAwIDEgLTcgLTIgLTE1eiBtLTg5IC02NSBjMTAgMAoyNiA2IDM0IDE0IDE0IDEzIDI0IDggODAgLTM2IDUzIC00MiA2MSAtNTIgNDcgLTYwIC05IC01IC0yNCAtNyAtMzQgLTQgLTI3IDkKLTE3MyA5IC0yMTYgMSBsLTM5IC04IDUgMzQgYzQgMTkgMTYgNTIgMjggNzIgbDIzIDM4IDI2IC0yNSBjMTUgLTE0IDM1IC0yNgo0NiAtMjZ6IG0xNzMzIC04MTkgYy0zIC0xMTMgLTggLTIxNCAtMTIgLTIyMyAtNCAtOSAtMTcgLTE4IC0yOSAtMjAgLTE2IC0yCi0zNiAtMjkgLTc0IC05OCAtNjkgLTEyNSAtNzAgLTE4MCAtNCAtMjE0IDIzIC0xMiAyNyAtMjAgMjMgLTQxIC01IC0zMSAtMjIKLTQwIC01NyAtMzEgLTIyIDYgLTI1IDEyIC0yNSA1MCAwIDI0IC03IDYxIC0xNiA4MiAtMTIgMjkgLTEzIDQzIC01IDU2IDE4IDMwCjEyIDEwNCAtMTQgMTc0IC0zMCA4MCAtMzEgOTggLTQgNjIgMzcgLTUwIDg1IC0zNCAxMTQgMzYgMjEgNTAgMTkgOTQgLTEwIDE3MQotMTQgMzcgLTIzIDc1IC0yMCA4NSAzIDkgMjggMzYgNTUgNTkgMjggMjMgNTMgNTQgNTYgNjggNiAyMyA4IDI0IDE3IDggNiAtMTEKOCAtOTggNSAtMjI0eiIvPgo8cGF0aCBkPSJNNTIyNCA3MTkyIGwyOSAtNyAtNTEgLTI0IGMtMzAgLTE0IC01OCAtMjEgLTY4IC0xNyAtMTYgNiAtMTYgOCAtNAoxNiAxMiA4IDkgMTAgLTEwIDEwIC0zMCAwIC01MCAtMTcgLTUwIC00MSAwIC0yMSA2NCAtMTA1IDkyIC0xMjAgMTkgLTEwIDI1Ci04IDQyIDE0IDEyIDE0IDMwIDI3IDQxIDI5IDEzIDIgMjEgMTIgMjMgMzAgMiAxNSAxNCAzNiAyOCA0NyAyMyAxOCAzMiA0NSAxNwo1NCAtNSAzIC0zMyA3IC02MyAxMCAtMzAgMyAtNDIgMyAtMjYgLTF6Ii8+CjxwYXRoIGQ9Ik02MzEwIDcxNjYgYzAgLTIgNyAtNyAxNiAtMTAgOCAtMyAxMiAtMiA5IDQgLTYgMTAgLTI1IDE0IC0yNSA2eiIvPgo8cGF0aCBkPSJNNTg3NSA3MDY5IGMtMTcgLTggLTE1IC04IDggLTQgNDIgOCAzMiAtNyAtMjggLTQyIC01OCAtMzMgLTc0IC0yOQotMjkgNiAxNSAxMiAyMiAyMSAxNyAyMSAtMTQgMCAtNTggLTUwIC03NyAtODcgLTM5IC03OCAxIC0xNjMgNzggLTE2MyA0NCAwCjQ4IDIyIDEwIDYxIC0zNiAzOCAtMjYgNzcgMzMgMTI4IDMzIDI5IDQ0IDQ2IDQxIDYzIC0zIDI1IC0yMyAzMiAtNTMgMTd6Ii8+CjxwYXRoIGQ9Ik01NzU1IDY3MjAgYy0zIC02IDEgLTcgOSAtNCAxOCA3IDIxIDE0IDcgMTQgLTYgMCAtMTMgLTQgLTE2IC0xMHoiLz4KPHBhdGggZD0iTTQ0MTggNjY1OCBjLTE1IC0xNSAtMTcgLTI3IC0xMiAtNTYgOSAtNTAgMTUgLTU1IDgxIC02MCA0OCAtMyA2NCAwCjkyIDIwIDQ3IDMyIDU3IDUxIDQ1IDg1IC05IDI4IC0xMCAyOCAtOTkgMjkgLTc0IDAgLTkyIC0zIC0xMDcgLTE4eiBtMTYyIDIKYy0xNCAtNCAtNTIgLTggLTg1IC03IGwtNjAgMCA1NSA3IGMzMCA0IDY5IDcgODUgNyAyOSAxIDI5IDEgNSAtN3oiLz4KPHBhdGggZD0iTTQ2ODggNjQwMCBjLTI1IC0xNSAtNDAgLTY5IC0yOSAtMTA3IDkgLTMyIDkgLTMyIC0xMyAtMTggLTIxIDE0Ci0yNiAxMyAtNTcgLTggLTI4IC0xOSAtMzUgLTMxIC00MSAtNzIgLTQgLTMxIC0zIC01NCA0IC02MiAxNCAtMTggNTQgLTE2IDgzCjMgMjYgMTcgNTEgODUgMzkgMTA3IC00IDYgMSA0IDExIC01IDE2IC0xNSAxNyAtMjEgNyAtNDAgLTcgLTEzIC0xOSAtNDMgLTI3Ci02NyAtMjEgLTYxIC0xMiAtNjggNzMgLTU0IDUxIDkgNzIgMTggOTAgMzggMjkgMzQgMjggNDIgLTEyIDExOCAtMTkgMzYgLTQwCjg0IC00NiAxMDggLTE4IDY4IC00MCA4MyAtODIgNTl6Ii8+CjxwYXRoIGQ9Ik02ODMyIDU4MDggYy05NyAtMTQgLTIxNCAtODAgLTM5NSAtMjIxIC01NCAtNDIgLTEwNSAtNzcgLTExNCAtNzcKLTkgMCAtMzIgNCAtNTIgMTAgLTIwIDUgLTEzMCAzMiAtMjQ2IDYwIC0xMTUgMjggLTI1OCA2MiAtMzE4IDc3IGwtMTA3IDI2Ci00OCAtMjEgYy0yNiAtMTIgLTU4IC0yMyAtNzEgLTI0IC01MCAtNiAtMjggLTI3IDk2IC05NiAxODEgLTEwMCAzNzcgLTIxMwo0MDkgLTIzNyBsMjcgLTIxIC03OSAtNjkgYy00MyAtMzkgLTk3IC04OCAtMTE5IC0xMTAgLTIyIC0yMSAtNDMgLTM5IC00NyAtNDAKLTcgMCAtMTMxIC05OSAtMTU5IC0xMjYgLTE1IC0xNSAtMjUgLTE0IC0xMzAgNyAtNzMgMTUgLTExNiAyOSAtMTIyIDM5IC02IDExCi0xNiAxNCAtMjkgOSAtMzQgLTEwIC0xMTkgLTc1IC0xMTIgLTg1IDMgLTUgNjAgLTQ2IDEyNyAtOTAgNjcgLTQ1IDEyNSAtODYKMTI5IC05MiAzIC02IDE5IC02MyAzMyAtMTI2IDQzIC0xODIgNDUgLTE5MSA1NSAtMTkxIDIwIDAgOTYgNjggMTEyIDEwMCAxNQozMSAzMiAxMDQgNTMgMjIzIDUgMzQgMTQgNDMgNzggODQgNDAgMjUgMTM5IDg4IDIyMCAxNDEgODIgNTIgMTUyIDkxIDE1NiA4Ngo0IC01IDI3IC0xMTAgNTAgLTIzNCA1NiAtMjk3IDcxIC0zNjAgODIgLTM2MCA2IDAgMzIgMTUgNjAgMzIgNTIgMzUgNzkgNzcgNzkKMTI2IDAgMTYgNyA4OSAxNSAxNjMgOCA3NCAyMSAyMDIgMzAgMjg0IDI4IDI3NCA5IDIzMSAxNTAgMzQwIDE5NSAxNTEgMjkyCjI2MyAzMDggMzU1IDEyIDYyIC0xMiA3MyAtMTIxIDU4eiIvPgo8cGF0aCBkPSJNNDg5NSA1NjMxIGMtMzggLTUgLTk5IC0xOCAtMTM0IC0yOSAtMzUgLTEyIC04NiAtMjIgLTExMyAtMjIgLTQ3IDAKLTUzIC0zIC0xMDggLTU4IC0zNyAtMzcgLTYwIC03MCAtNjUgLTkxIC00IC0yMCAtMzEgLTYwIC02OSAtMTAwIC05NCAtMTAzCi0xMDggLTE0MCAtMTE4IC0zMDEgLTUgLTc0IC02IC0xNTAgLTMgLTE2NyAzIC0xOCAzOCAtNzYgNzkgLTEzMSA5MyAtMTI0IDEyMwotMTQyIDI0NyAtMTQyIDQ4IDAgMTI1IDkgMTc4IDIwIDY5IDE1IDk3IDE4IDEwNyA5IDEwIC04IDI3IC0yIDcxIDI3IDMyIDIxCjYwIDQyIDYxIDQ2IDIgNSA4IDggMTIgOCA1IDAgMzUgMTYgNjYgMzQgNDQgMjcgNjIgMzMgNzYgMjUgMTAgLTUgMTggLTE0IDE4Ci0xOSAwIC02IC0zMSAtMzEgLTY5IC01NiAtMzggLTI1IC03MiAtNTIgLTc1IC02MCAtMyAtOCAtMTUgLTE0IC0yNiAtMTQgLTExCjAgLTIzIC02IC0yNiAtMTMgLTMgLTggLTEwIC0xNCAtMTcgLTE0IC03IDAgLTU3IC0yOCAtMTEyIC02MyAtMTM0IC04NSAtMzQ1Ci0yMDMgLTY0NSAtMzYwIC0xNzIgLTkwIC01NjUgLTI1NyAtNzIyIC0zMDYgLTMyIC0xMCAtNTggLTIxIC01OCAtMjYgMCAtNCAtOQotOCAtMTkgLTggLTExIDAgLTc2IC0xMyAtMTQ0IC0zMCAtMjEyIC01MCAtMzA2IC02MyAtNDM1IC01OCAtMTc3IDcgLTI2NCA0NgotMzA0IDEzNiAtNDggMTA4IDMgMjU1IDE4NiA1NDQgMTkgMzAgMTkgMzEgLTcgMTQyIC0xNCA2MSAtMjkgMTMwIC0zMyAxNTQgLTQKMjQgLTExIDQxIC0xOCAzOSAtMTUgLTUgLTEyMyAtMTM4IC0xODggLTIzMiAtMTM5IC0yMDMgLTE5NyAtMzU0IC0yMDUgLTUzNgotNCAtOTEgLTIgLTEyNyAxMiAtMTc1IDQ3IC0xNjUgMTU5IC0yNzAgMzQ1IC0zMjQgMTE2IC0zNCAzMzMgLTM5IDUxNSAtMTEKNTk4IDkwIDEyOTAgMzkyIDIxMTQgOTIyIDY3IDQzIDEyNyA4MiAxMzIgODUgNSAzIDkgLTcgOSAtMjEgMCAtMTggLTExIC0zNgotMzIgLTUzIC0xNyAtMTUgLTQ1IC0zOSAtNjEgLTU0IC0xNiAtMTYgLTMzIC0yOCAtMzggLTI4IC01IDAgLTkgLTQgLTkgLTkgMAotNSAtMjEgLTE3IC00NyAtMjcgLTI3IC0xMCAtNjcgLTM2IC05MCAtNTcgLTM2IC0zMyAtNDEgLTQyIC0zNiAtNzAgMyAtMjEgLTQKLTU2IC0yMSAtMTAxIC0zNCAtODkgLTMzIC0xMTkgOCAtMjI0IDE4IC00OCA0NSAtMTIzIDU5IC0xNjcgNzIgLTIyNiA3NiAtMjMwCjIxNiAtMjAxIDQ3IDEwIDEwMCAyNiAxMTggMzcgNDMgMjcgMTEwIDEwNCAxMzggMTYwIDEzIDI1IDMxIDUxIDQwIDU5IDI1IDIwCjQ1IDY1IDQ1IDk5IDAgNDkgMTUgNzQgNjkgMTE2IDY1IDUyIDkxIDEwMyA5MSAxODEgLTEgMzIgLTUgNzkgLTEwIDEwNCAtMTYKODIgMiAxMjkgODYgMjIyIDEwNCAxMTYgMTYxIDIwNCAxODEgMjgyIDEwIDM2IDE1IDY4IDExIDcxIC0zIDMgLTIyIC0xIC00MwotOSAtNTkgLTI1IC0xMjkgLTMxIC0xNDQgLTEyIC0xMiAxNCAtMTYgMTQgLTQyIDAgLTE2IC04IC0zNSAtMTIgLTQxIC04IC02IDQKLTggMyAtNCAtNCAzIC02IC0yIC0xMyAtMTIgLTE2IC00MCAtMTMgLTYyIC01MiAtOTEgLTE2NiAtMjggLTEwOCAtMzMgLTExNwotNzMgLTE1MyAtNDUgLTQwIC0xMzUgLTk3IC0xNTQgLTk3IC0xMiAwIC03MSAyMDkgLTg0IDI5OSAtNyA0MiAtMTUgNTkgLTM3Cjc3IC0xNSAxMiAtMzEgMjAgLTM1IDE3IC01IC0yIC04IDEgLTggNiAwIDYgLTcgMTEgLTE1IDExIC04IDAgLTMwIDE1IC00OCAzMwotMTkgMTcgLTU2IDQ1IC04MyA2MSAtMjcgMTYgLTYwIDQzIC03MyA1OSBsLTI1IDMwIDM1IDI4IGM2MiA1MSAxNTIgOTkgMTg2Cjk5IDE4IDAgNzkgLTkgMTM1IC0yMCA1NyAtMTEgMTExIC0yMCAxMjAgLTIwIDEwIDAgNDggMjkgODYgNjUgbDY4IDY0IC00NCA4OQpjLTY1IDEzMSAtNTMgMTQ3IDMxIDM5IDM4IC00OCA3MiAtODcgNzUgLTg3IDEzIDEgMTA2IDk5IDEwMCAxMDUgLTQgNCAtMjYgMTEKLTUwIDE2IC0yNyA2IC01MiAyMSAtNjggMzkgLTE0IDE1IC00NyA0MCAtNzQgNTQgLTQxIDIyIC02MiAyNiAtMTI5IDI2IC01MSAwCi0xMTAgOCAtMTU5IDIxIC03NSAyMCAtOTIgMzIgLTY1IDQyIDYgMyAxIDYgLTEzIDYgLTMxIDEgLTcwIC0yNCAtNzAgLTQ1IDAKLTI5IC0yOSAtMjUgLTEwNyAxNiAtMTAxIDU0IC0xMDMgNTYgLTEwMyA5OSAwIDcyIC0zNSA4NiAtMTc1IDcyeiBtLTIzNTUKLTE4MjUgYzAgLTYgLTYgLTQgLTEzIDUgLTcgOSAtMTYgMTYgLTIxIDE1IC01IC0xIC0xMCA3IC0xMiAxOCAtMiAxNiAwIDE2IDIyCi01IDEzIC0xMiAyNCAtMjcgMjQgLTMzeiIvPgo8cGF0aCBkPSJNNTQyMCA1NDYwIGM4IC01IDIyIC05IDMwIC05IDEwIDAgOCAzIC01IDkgLTI3IDEyIC00MyAxMiAtMjUgMHoiLz4KPHBhdGggZD0iTTI5OTMgNTI0MyBjLTQgLTExIDAgLTIxIDExIC0yNyAxMCAtNiAzNyAtMjMgNjAgLTM4IDYyIC00MSAxMDMgLTMzCjc3IDE2IC0yOSA1NCAtMTMzIDg5IC0xNDggNDl6Ii8+CjxwYXRoIGQ9Ik0zMTgxIDUxNTEgYy0xMyAtNCAtMjkgLTE0IC0zNCAtMjMgLTE2IC0yNCA2IC00NCA1NSAtNTEgNjkgLTkgMTAzCjI0IDU2IDU1IC0zNCAyMSAtNTAgMjUgLTc3IDE5eiIvPgo8cGF0aCBkPSJNNTk3OCA0MDY1IGMtNTYgLTUzIC03OCAtODEgLTc4IC05OCAwIC0xNCAtOSAtNTQgLTIwIC05MCAtMjYgLTg1Ci0xOCAtMTM1IDI2IC0xNTMgNTMgLTIyIDgyIDUgMTM4IDEzMiA1NSAxMjUgNzYgMjE4IDU4IDI1OCAtNiAxNCAtMjAgMjYgLTI5CjI2IC0xMCAwIC01MyAtMzQgLTk1IC03NXoiLz4KPC9nPgo8L3N2Zz4K";

export function Header({ activeSection, onNavigate, onOpenAuth, onOpenContact, isDarkMode, onToggleTheme }: HeaderProps) {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as const, label: t('nav.home'), icon: Globe },
    { id: 'planner' as const, label: t('nav.planner'), icon: Calendar },
    { id: 'translator' as const, label: t('nav.translator'), icon: LanguagesIcon },
    { id: 'maps' as const, label: t('nav.maps'), icon: Map },
    { id: 'mytrips' as const, label: t('nav.mytrips'), icon: Plane },
  ];

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    onNavigate('home');
  };

  const languageOptions = [
    { code: 'en' as const, label: 'English', flag: '🇬🇧' },
    { code: 'ru' as const, label: 'Русский', flag: '🇷🇺' },
    { code: 'kk' as const, label: 'Қазақша', flag: '🇰🇿' },
  ];

  const currentLanguage = languageOptions.find(lang => lang.code === language) || languageOptions[0];

  return (
    <header
      className="sticky top-0 z-50 shadow-lg transition-colors duration-300"
      style={{
        background: isDarkMode
          ? 'linear-gradient(90deg, #0f172a 0%, #1e293b 100%)'
          : 'linear-gradient(90deg, #1e3a5f 0%, #1a2e4a 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── MAIN ROW: 3 independent flex blocks ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px', gap: '12px' }}>

          {/* ── LEFT BLOCK: Logo ── */}
          <button
            onClick={() => onNavigate('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}
            className="hover:opacity-80 transition-opacity"
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                flexShrink: 0,
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #533483 100%)',
                boxShadow: '0 2px 8px rgba(83,52,131,0.5)',
              }}
            >
              <img
                src={LOGO_SRC}
                alt="Alem Travel Logo"
                style={{ width: '32px', height: '32px', objectFit: 'contain', filter: 'invert(1) brightness(1.8)' }}
              />
            </div>
            <span
              className="hidden sm:block"
              style={{ ...appleFont, fontSize: '1.2rem', color: '#ffffff', whiteSpace: 'nowrap' }}
            >
              Alem Travel
            </span>
          </button>

          {/* ── CENTER BLOCK: Desktop Navigation ── */}
          <nav
            className="hidden lg:flex"
            style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: '1 1 auto', justifyContent: 'center' }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    whiteSpace: 'nowrap',
                    fontSize: '0.875rem',
                    transition: 'all 0.15s ease',
                    background: isActive ? 'rgba(255,255,255,0.18)' : 'transparent',
                    color: isActive ? '#ffffff' : 'rgba(186,215,255,0.8)',
                    fontWeight: isActive ? 600 : 400,
                    boxShadow: isActive ? 'inset 0 1px 0 rgba(255,255,255,0.15)' : 'none',
                    border: isActive ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
                      (e.currentTarget as HTMLElement).style.color = '#ffffff';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                      (e.currentTarget as HTMLElement).style.color = 'rgba(186,215,255,0.8)';
                    }
                  }}
                >
                  <Icon style={{ width: '15px', height: '15px', flexShrink: 0 }} />
                  <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* ── RIGHT BLOCK: Controls ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>

            {/* Theme Toggle */}
            <div
              className="hidden sm:flex items-center gap-2"
              style={{
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.1)',
                padding: '6px 10px',
              }}
            >
              {isDarkMode
                ? <Moon className="h-4 w-4" style={{ color: '#93c5fd' }} />
                : <Sun className="h-4 w-4" style={{ color: '#fcd34d' }} />}
              <Switch checked={isDarkMode} onCheckedChange={onToggleTheme} aria-label="Toggle theme" />
            </div>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.1)',
                    padding: '6px 10px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#ffffff',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'background 0.15s',
                  }}
                >
                  <Globe style={{ width: '15px', height: '15px', color: '#93c5fd', flexShrink: 0 }} />
                  <span className="hidden sm:inline" style={{ whiteSpace: 'nowrap' }}>
                    {currentLanguage.flag} {currentLanguage.label}
                  </span>
                  <span className="sm:hidden">{currentLanguage.flag}</span>
                  <ChevronDown style={{ width: '13px', height: '13px', opacity: 0.6, flexShrink: 0 }} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-44 rounded-xl border-gray-200 bg-white p-1 shadow-xl dark:border-slate-700 dark:bg-slate-950"
              >
                {languageOptions.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors focus:bg-gray-100 focus:outline-none dark:focus:bg-slate-800 ${
                      language === lang.code
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400'
                        : 'text-gray-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span className="flex-1">{lang.label}</span>
                    {language === lang.code && (
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Contact Button */}
            <button
              onClick={onOpenContact}
              className="hidden sm:block"
              style={{
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.1)',
                padding: '6px 12px',
                fontSize: '0.875rem',
                color: '#ffffff',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            >
              {t('nav.contact')}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    borderRadius: '8px',
                    border: '1px solid rgba(96,165,250,0.4)',
                    background: 'rgba(59,130,246,0.25)',
                    padding: '6px 10px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <User style={{ width: '18px', height: '18px', flexShrink: 0 }} />
                  <span className="hidden sm:block" style={{ whiteSpace: 'nowrap' }}>{user.name}</span>
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl border border-gray-200 bg-white py-2 shadow-xl dark:border-slate-700 dark:bg-slate-900">
                      <div className="border-b border-gray-200 px-4 py-2 dark:border-slate-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                      <button
                        onClick={() => { onNavigate('mytrips'); setUserMenuOpen(false); }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-800"
                      >
                        <Plane className="w-4 h-4" />
                        {t('nav.mytrips')}
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        {t('nav.logout')}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                style={{
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  padding: '6px 14px',
                  fontSize: '0.875rem',
                  color: '#ffffff',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  border: 'none',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                {t('nav.signin')}
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden"
              style={{
                borderRadius: '8px',
                padding: '7px',
                color: 'rgba(255,255,255,0.85)',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                cursor: 'pointer',
              }}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden py-3"
            style={{
              borderTop: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(15,23,42,0.97)',
            }}
          >
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      background: isActive ? 'rgba(255,255,255,0.18)' : 'transparent',
                      color: isActive ? '#ffffff' : 'rgba(186,215,255,0.8)',
                      fontWeight: isActive ? 600 : 400,
                      border: 'none',
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'left',
                    }}
                  >
                    <Icon style={{ width: '18px', height: '18px', flexShrink: 0 }} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <div
                className="flex items-center justify-between sm:hidden"
                style={{
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  padding: '10px 16px',
                  marginTop: '4px',
                }}
              >
                <div className="flex items-center gap-2" style={{ color: 'rgba(186,215,255,0.8)', fontSize: '0.875rem' }}>
                  {isDarkMode
                    ? <Moon style={{ width: '16px', height: '16px', color: '#93c5fd' }} />
                    : <Sun style={{ width: '16px', height: '16px', color: '#fcd34d' }} />}
                  <span>Тақырып</span>
                </div>
                <Switch checked={isDarkMode} onCheckedChange={onToggleTheme} aria-label="Toggle theme" />
              </div>
              <button
                onClick={() => { onOpenContact(); setMobileMenuOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  color: 'rgba(186,215,255,0.8)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <Globe style={{ width: '18px', height: '18px' }} />
                <span>{t('nav.contact')}</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}