import networkx as nx

def analyze_pipeline(nodes, edges):
    """
    Constructs a NetworkX graph and checks for DAG status.
    Returns a dictionary with stats.
    """
    num_nodes = len(nodes)
    num_edges = len(edges)

    # Create a Directed Graph
    G = nx.DiGraph()

    # Add Nodes (using their IDs)
    for node in nodes:
        G.add_node(node['id'])

    # Add Edges (source -> target)
    for edge in edges:
        G.add_edge(edge['source'], edge['target'])

    # Check for Cycles (DAG)
    is_dag = nx.is_directed_acyclic_graph(G)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }