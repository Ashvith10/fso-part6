{
  description = "FSO part 6";
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-23.05";
  outputs = inputs@{ flake-parts, ... }:
  flake-parts.lib.mkFlake { inherit inputs; } {
    systems = [
      "x86_64-linux" "x86_64-darwin"
      "aarch64-linux" "aarch64-darwin"
    ];
    perSystem = { config, self', inputs', pkgs, system, ... }: {
      devShells.default = with pkgs; mkShell {
        buildInputs = ([ nodejs ])
          ++ (with nodePackages; [ pnpm ]);
      }; 
    };
  };
}
