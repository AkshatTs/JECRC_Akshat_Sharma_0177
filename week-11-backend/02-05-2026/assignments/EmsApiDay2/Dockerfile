FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["EmsApiDay2.csproj", "./"]
RUN dotnet restore "EmsApiDay2.csproj"
COPY . .
RUN dotnet build "EmsApiDay2.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "EmsApiDay2.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "EmsApiDay2.dll"]